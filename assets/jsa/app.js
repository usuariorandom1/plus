var contractAddress
var privateKey
var tronWeb
var pay
var payB
var cont
var Inv
var addPay
var addresact
const  decimals = 1000000; //8 decimals in test, 6 decimals in production
const  trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const  fullNode = 'https://api.shasta.trongrid.io';     //Production: https://api.trongrid.io
const  solidityNode = 'https://api.shasta.trongrid.io'; //Test: https://api.shasta.trongrid.io
const  eventServer = 'https://api.shasta.trongrid.io';
// USDT Token = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
// TEST Token = 'TQ7srwpzYEU9j7b5pcd31NgUKDQ64oZSuG'

try {
  contractAddress = AppConfig.contractAddress
  privateKey = AppConfig.privateKey
  tronWeb = require('tronweb')(
      fullNode,
      AppConfig.fullHost,
      AppConfig.fullHost,
      AppConfig.privateKey
  )
} catch (err) {
  console.log(err);
  // alert('The app looks not configured. Please run `npm run migrate`')
}

/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$("#Referral").text(window.location.hostname+'?ref=');
$("#ReferralB").text(window.location.hostname+'?ref=');

async function gettronweb(){ 
  if(window.tronWeb && window.tronWeb.defaultAddress.base58){
    localStorage.address = await window.tronWeb.defaultAddress.base58;
    if(localStorage.address != this.addresact) {
      // Store
      this.addresact = localStorage.address;
      // location.reload();
      console.log('actualizada '+this.addresact);
      this.pay = 0;
      this.addPay = 0;
      balanceact();
    }
    else if(localStorage.address == 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY'){
      // sleep(1000);
      localStorage.address = await window.tronWeb.defaultAddress.base58;
      this.addresact = localStorage.address;
    }
  }
}

function copyRef(id_elemento) {
	var aux=document.createElement("input");
	aux.setAttribute("value",document.getElementById(id_elemento).innerHTML);
	document.body.appendChild(aux);aux.select();document.execCommand("copy");
	document.body.removeChild(aux);
}
function copyRefB(id_elemento) {
  var aux=document.createElement("input");
  aux.setAttribute("value",document.getElementById(id_elemento).innerHTML);
  document.body.appendChild(aux);aux.select();document.execCommand("copy");
  document.body.removeChild(aux);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function convert_address(address) {
  var Addr = window.tronWeb.address.fromHex(address);
  
  return Addr;
}

pay = 0;
cont = 0;
addPay = 0;
async function balanceact() {
 
  const myContract = await tronWeb.contract().at(this.contractAddress);

  let Inv; 
  let Ref;
    
  await tronWeb.trx.getAccount(addresact).then(_balance => {
  // sleep(1000);
      _balance = parseInt(_balance.balance);
      _balance = _balance/decimals;
      $("#balances").text(_balance);
  }).catch(err => console.error(err));

  function format_time(time) {
    var Inve = new Date(time * 1000).toLocaleDateString("es-CO")
    
    return Inve;
  }
  // console.log(window.tronWeb);

  myContract.userIDsA(addresact).call().then(IdUsA => {
    var IdUser = parseInt(IdUsA.id);
    myContract.referersA(IdUser).call().then(RefA => {
      console.log({RefA});
      $("#AmounEarnedRef").text(RefA.amountEarn/decimals);
      $("#Ref0").text(RefA.level1);
      $("#Ref1").text(RefA.level2);
      $("#Ref2").text(RefA.level3);
      $("#Ref3").text(RefA.level4);
      $("#Ref4").text(RefA.level5);
      $("#Ref5").text(RefA.level6);
      $("#Ref6").text(RefA.level7);
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));

  myContract.userIDsB(addresact).call().then(IdUsB => {
    var IdUser = parseInt(IdUsB.id);
    myContract.referersB(IdUser).call().then(RefB => {
      console.log({RefB});
      $("#AmounEarnedRefB").text(RefB.amountEarn/decimals);
      $("#RefB0").text(RefB.level1);
      $("#RefB1").text(RefB.level2);
      $("#RefB2").text(RefB.level3);
      $("#RefB3").text(RefB.level4);
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));

}

App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey: privateKey,
  feeLimit: decimals,
  callValue: 0,

  abi: [
  {
  }
  ],

  init: async function () {
    
    // await gettronweb();
    // this.accounts
    this.initData();
    this.bindEvents();
  },

  
  initData: function () {
    var c = 0
    
    function reset() {
      c++;
      if (c == 2) {
        $("#loading").css({display: 'none'});
        $("#commit").attr('disabled', null);
      }
    }
    

    async function refrescar() {
    
      await this.gettronweb();
      // await this.sleep(1000);

      var totalInvest;
      var timepay;
      var totalInvest;
      // var myContract = new XMLHttpRequest();
      const myContract = await tronWeb.contract().at(this.contractAddress);

      myContract.totalInvestors().call().then(totalInv => {
        this.totalInvest = parseInt(totalInv);
        $("#Investors").text(this.totalInvest);
        $("#InvestorsB").text(this.totalInvest);
      }).catch(err => console.error(err));
	    
      myContract.totalTronInvested().call().then(totalInvested => {
        this.totalInvest = parseInt(totalInvested);
        $("#totalInvest").text(this.totalInvest/decimals);
        $("#totalInvestB").text(this.totalInvest/decimals);
      }).catch(err => console.error(err));

      myContract.BankAAwards().call().then(BankAAwards => {
        $("#WJackpot").text(BankAAwards/decimals);
      }).catch(err => console.error(err));

      myContract.BankBAwards().call().then(BankAAwards => {
        $("#WJackpotB").text(BankAAwards/decimals);
      }).catch(err => console.error(err));

      myContract.idWeek().call().then(idWeek => {
        $("#Week").text(idWeek);
        $("#WeekB").text(idWeek);
      }).catch(err => console.error(err));
      
      // myContract.totalInvestorsActive().call().then(totalInvActiv => {
      //   $("#totalActiveInvestors").text(totalInvActiv);
      // }).catch(err => console.error(err));

      myContract.getPrizeA().call().then(PrizeA => {
        console.log(PrizeA);
        // console.log(PrizeA.i);
        for(var i = 0; i < PrizeA.i; i++) {
          $("#Pos"+i).text(convert_address(PrizeA.addr[i]));
          $("#Amount"+i).text(PrizeA.totalRef[i]);
        }
      }).catch(err => console.error(err));

      myContract.getPrizeB().call().then(PrizeB => {
        // console.log(PrizeB.i);
        for(var i = 0; i < PrizeB.i; i++) {
          $("#PosB"+i).text(convert_address(PrizeB.addr[i]));
          $("#AmountB"+i).text(PrizeB.totalRef[i]);
        }
      }).catch(err => console.error(err));

      myContract.getLastWeekA().call().then(LastWA => {
        // console.log(LastWA);
        for(var i = 0; i < LastWA.i; i++) {
          $("#LWPos"+i).text(convert_address(LastWA.addr[i]));
          $("#LWAmount"+i).text(LastWA.totalRef[i]);
        }
      }).catch(err => console.error(err));

      myContract.getLastWeekB().call().then(LastWB => {
        // console.log(LastWB);
        for(var i = 0; i < LastWB.i; i++) {
          $("#LWPosB"+i).text(convert_address(LastWB.addr[i]));
          $("#LWAmountB"+i).text(LastWB.totalRef[i]);
        }
      }).catch(err => console.error(err));

      myContract.bankA(addresact).call().then(bankA => {
        var withdrawn = parseInt(bankA.totalAmountPayments);
        var AVWithdraw = parseInt(bankA.availableWithdraw);
        var prize = parseInt(bankA.prize);

        pay = AVWithdraw+prize;
        $("#Invest").text(bankA.totalAmountInvest/decimals);
        $("#YourRef").text(bankA.countRef);
        $("#Withdrawn").text(withdrawn/decimals);
        $("#AVWithdraw").text((AVWithdraw+prize)/decimals);
      }).catch(err => console.error(err));

      myContract.bankB(addresact).call().then(bankB => {
        var withdrawn = parseInt(bankB.totalAmountPayments);
        var AVWithdraw = parseInt(bankB.availableWithdraw);
        var prize = parseInt(bankB.prize);
        // console.log({AVWithdraw});
        // console.log({prize});
        payB = AVWithdraw+prize;
        $("#InvestB").text(bankB.totalAmountInvest/decimals);
        $("#YourRefB").text(bankB.countRef);
        $("#WithdrawnB").text(withdrawn/decimals);
        $("#AVWithdrawB").text((AVWithdraw+prize)/decimals);
      }).catch(err => console.error(err));

      // myHeaders.set('Accept-Encoding', 'deflate');
      // $.ajax("https://coinranking.com/coin/qUhEFk1I61atv+tron-trx", {
      //   method: "GET",
      //     headers: {
      //     "X-Mashape-Key": "coinranking36bcb3f843b37fb343126877852e4bfb83d2618e1a802005",
      //     "Accept": "application/json"
      //     },
      //     dataType: "json",
      //     success: (data) => {
      //     console.log(data) // your data
      //     },
      //   error: (xhr, textStatus, errorThrown) => {
      //   console.log(textStatus, errorThrown);
      //   }
      // });
      
      var location = window.location.hostname+'?ref='+addresact;
      $("#Referral").text(location);
      var location = window.location.hostname+'?ref='+addresact;
      $("#ReferralB").text(location);
    }
    setInterval(refrescar, 2000);
    
  },

  deposit: async function() {
  	
    var that = this;
    
    console.log({referido});
  	var referido = getParameterByName('ref');
    if(referido === ''){
       referido = addresact;
       console.log({referido});
    };
 
  	const monto = parseInt($("#value").val() || 0);
  	const montototal = monto * decimals;//Cambiar precision a 6 para produccion

  	$("#commit").attr('disabled', 'disabled')
  	
  	let myContract = await tronWeb.contract().at(contractAddress)
  	let getData = await myContract.DepositBankA(referido, montototal).send({
	    feeLimit:800_000_000,
	    callValue:montototal,
  		tokenId:0,
  		tokenValue:0,
  		shouldPollResponse:true
  	});
    console.log(getData);
    location.reload();
  },

  depositB: async function() {

    try {

        var that = this;
        
        console.log({referido});
        var referido = getParameterByName('ref');
        if(referido === ''){
           referido = addresact;
           console.log({referido});
        };
     
        const monto = parseInt($("#valueB").val() || 0);
        const montototal = monto * decimals;//Cambiar precision a 6 para produccion

        $("#commitB").attr('disabled', 'disabled')
        
        let myContract = await tronWeb.contract().at(contractAddress)
        let getData = await myContract.DepositBankB(referido, montototal).send({
          feeLimit:800_000_000,
          callValue:montototal,
          tokenId:0,
          tokenValue:0,
          shouldPollResponse:true
        
        }).then(output => {console.log('- Output:', output, '\n');});
        console.log('result: ', result);
        console.log(getData);
        location.reload();
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
  },

  withdraw: async function () {
    var that = this;
    var profit = pay;
    console.log({profit});
    
    if(profit > 0) {
    	let myContract = await tronWeb.contract().at(this.contractAddress);
	    let Data = await myContract.WithdrawA().send();
	    //console.log({Data});
	    that.initData();
    }
    else {
	    alert('Your balance is insufficient to withdraw!')
    }
    location.reload();
  },

  withdrawB: async function () {
    var that = this;
    var profit = payB;
    console.log({profit});
    
    if(profit > 0) {
      let myContract = await tronWeb.contract().at(this.contractAddress);
      let Data = await myContract.WithdrawB().send();
      //console.log({Data});
      that.initData();
    }
    else {
      alert('Your balance is insufficient to withdraw!')
    }
    location.reload();
  },

  transfer: function () {
    var that = this;
    var count = $("#dev_count").val() || 0;
    const to = this.accounts[1];
    const amount = parseInt(count);
    $("#loading").css({display: 'block'});
    $("#dev_count").val('')
    $("#commit").attr('disabled', 'disabled')
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();
    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: async function (methodName, args, callback) {
    let myContract = await tronWeb.contract().at(this.contractAddress)
    var callSend = 'send'
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
      }
    })
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.deposit();
    });
    $(document).on('click', '#commitB', function () {
      that.depositB();
    });
    $(document).on('click', '#withdraw', function () {
      that.withdraw();
    });
    $(document).on('click', '#withdrawB', function () {
      that.withdrawB();
    });
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).Inva('id'));

    /*
     * Replace me...
     */
  }
};

$(function () {
  //$(window).onload(function () {
  $(window).on("load",function(){
    App.init();
  });
});
