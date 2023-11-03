pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; // Enable the experimental feature

contract UserContract {
    struct User {
        uint256 id;
        string name;
        string email;
        string password; // Reminder: storing passwords like this is insecure.
        bool isActive;
        uint256 version;
    }

    uint256 private idCounter = 1;
    mapping(uint256 => uint256) public latestUserVersion;
    mapping(uint256 => mapping(uint256 => User)) public userRecords;

    event UserCreated(
        uint256 indexed id,
        string email,
        string password // For the sake of this example, password is included here, but it is not secure.
    );

    event UserUpdated(
        uint256 indexed id,
        string name,
        string email,
        string password,
        bool isActive,
        uint256 version
    );

    event UserDeactivated(
        uint256 indexed id
    );

    function createUser(string memory email, string memory password) public {
        uint256 userId = idCounter;
        idCounter++; // Increment the ID counter for the next user
        uint256 version = 1;
        latestUserVersion[userId] = version;

        User storage user = userRecords[userId][version];
        user.id = userId;
        user.name = ""; // Placeholder for user name
        user.email = email;
        user.password = password;
        user.isActive = false; // Assuming a user is active upon creation
        user.version = version;

        emit UserCreated(userId, email, password);
    }

    function updateUser(uint256 id, string memory name, string memory email, string memory password) public {
        uint256 version = latestUserVersion[id] + 1;
        latestUserVersion[id] = version;

        User storage user = userRecords[id][version];
        user.id = id;
        user.name = name;
        user.email = email;
        user.password = password; // Update password here
        user.isActive = true;
        user.version = version;

        emit UserUpdated(id, name, email, password, true, version);
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

    // Add more functions if necessary...
}
