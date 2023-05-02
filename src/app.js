App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const todoList = await $.getJSON('TodoList.json')
      App.contracts.TodoList = TruffleContract(todoList)
      App.contracts.TodoList.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.todoList = await App.contracts.TodoList.deployed()
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
  
      // Render Records
      await App.renderRecordss()
  
      // Update loading state
      App.setLoading(false)
    },
  
    renderrecords: async () => {
      // Load the total record count from the blockchain
      const recordCount = await App.todoList.recordCount()
      const $recordTemplate = $('.recordTemplate')
  
      // Render out each record with a new record template
      for (var i = 1; i <= recordCount; i++) {
        // Fetch the record data from the blockchain
        const record = await App.todoList.records(i)
        const recordId = record[0].toNumber()
        const recordContent = record[1]
        const recordCompleted = record[2]
  
        // Create the html for the record
        const $newRecordTemplate = $recordTemplate.clone()
        $newRecordTemplate.find('.content').html(recordContent)
        $newRecordTemplate.find('input')
                        .prop('name', recordId)
                        .prop('checked', recordCompleted)
                        .on('click', App.toggleCompleted)
  
        // Put the record in the correct list
        if (recordCompleted) {
          $('#completedRecordList').append($newRecordTemplate)
        } else {
          $('#recordList').append($newRecordTemplate)
        }
  
        // Show the record
        $newRecordTemplate.show()
      }
    },
  
    createRecord: async () => {
      App.setLoading(true)
      const content = $('#newRecord').val()
      await App.todoList.createRecord(content)
      window.location.reload()
    },
  
    toggleCompleted: async (e) => {
      App.setLoading(true)
      const recordId = e.target.name
      await App.todoList.toggleCompleted(recordId)
      window.location.reload()
    },
  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })