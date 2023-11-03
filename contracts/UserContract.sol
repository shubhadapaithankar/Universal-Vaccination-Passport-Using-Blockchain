pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; // Enable the experimental feature

contract UserContract {
    struct User {
        uint256 id;
        string name;
        string email;
        string passwordHash; 
        bool isActive;
        uint256 version;
    }

    uint256 private idCounter = 1;
    mapping(bytes32 => uint256) private emailToId; // Maps hashed emails to user IDs
    mapping(uint256 => uint256) public latestUserVersion;
    mapping(uint256 => mapping(uint256 => User)) public userRecords;

    event UserCreated(uint256 id, string email);
    event UserUpdated(uint256 id, string email, bool isActive);
    event UserDeactivated(uint256 id);

    // Helper function to hash the email
    function hashEmail(string memory email) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(email));
    }

    function getEmailHash(string memory email) public view returns (bytes32) {
    return hashEmail(email);
    }

    function hashPassword(string memory password) private pure returns (string memory) {
        return string(abi.encodePacked(keccak256(abi.encodePacked(password))));
    }


    function createUser(string memory email, string memory password) public {

        bytes32 emailHash = hashEmail(email);

        // Check if the email is already in use
        require(emailToId[emailHash] == 0, "Email already in use.");

        uint256 userId = idCounter++;
        emailToId[emailHash] = userId;
        uint256 version = 1;
        latestUserVersion[userId] = version;

        User storage user = userRecords[userId][1];
        user.id = userId;
        user.name = ""; // Placeholder for user name
        user.email = email;
        user.passwordHash = hashPassword(password);
        user.isActive = false; // Assuming a user is inactive upon creation
        user.version = 1;

        emit UserCreated(userId, email);
    }

    function updateUser(uint256 id, string memory name, string memory email, string memory password) public {
        uint256 version = latestUserVersion[id] + 1;
        latestUserVersion[id] = version;

        User storage user = userRecords[id][version];
        user.id = id;
        user.name = name;
        user.email = email;
        user.passwordHash = hashPassword(password);
        user.isActive = true;
        user.version = version;

        emit UserUpdated(id, email, user.isActive);
    }

    function deactivateUser(uint256 id) public {
        uint256 version = latestUserVersion[id] + 1;
        latestUserVersion[id] = version;

        User storage user = userRecords[id][version];
        user.isActive = false;
        user.version = version;

        emit UserDeactivated(id); // Emitting a different event for deactivation
    }

    function getLatestUserData(uint256 id) public view returns (User memory) {
        uint256 version = latestUserVersion[id];
        return userRecords[id][version];
    }

}
