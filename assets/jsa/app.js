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
const  fullNode = 'https://api.nileex.io';     //Production: https://api.trongrid.io
const  solidityNode = 'https://api.shasta.trongrid.io'; //Test: https://api.shasta.trongrid.io
const  eventServer = 'https://event.nileex.io';
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
      this.payB = 0;
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
payB = 0;
cont = 0;
addPay = 0;
var weekPeriodA;
var weekPeriodB;
async function balanceact() {
 
  const myContract = await tronWeb.contract().at(this.contractAddress);

  let Inv; 
  let Ref;
  var IdUser;
    
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

  function convert_address(address) {
    var Addr = window.tronWeb.address.fromHex(address);
    
    return Addr;
  }

  // console.log(window.tronWeb);

  await myContract.getRefA().call().then(RefAt => {
    console.log({RefAt});
    
    var id = RefAt.count;
    var idtab = 1;
    for(var i = 0; i < id; i++) {

      if(RefAt.level[i] == 1) {
        $("#tableRefALevel1").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 2) {
        $("#tableRefALevel2").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 3) {
        $("#tableRefALevel3").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 4) {
        $("#tableRefALevel4").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 5) {
        $("#tableRefALevel5").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 6) {
        $("#tableRefALevel6").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefAt.level[i] == 7) {
        $("#tableRefALevel7").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefAt.ref[i]) + '</td>' +
                                    '<td>' + RefAt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }
      
      idtab++;
    }
  }).catch(err => console.error(err));

  await myContract.getRefB().call().then(RefBt => {
    console.log({RefBt});
    
    var id = RefBt.count;
    var idtab = 1;
    for(var i = 0; i < id; i++) {

      if(RefBt.level[i] == 1) {
        $("#tableRefBLevel1").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefBt.ref[i]) + '</td>' +
                                    '<td>' + RefBt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefBt.level[i] == 2) {
        $("#tableRefBLevel2").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefBt.ref[i]) + '</td>' +
                                    '<td>' + RefBt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefBt.level[i] == 3) {
        $("#tableRefBLevel3").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefBt.ref[i]) + '</td>' +
                                    '<td>' + RefBt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }

      else if(RefBt.level[i] == 4) {
        $("#tableRefBLevel4").append('<tr>' +
                                    '<th scope="row">' + idtab + '</th>' +
                                    '<td>' + convert_address(RefBt.ref[i]) + '</td>' +
                                    '<td>' + RefBt.amountEarn[i]/decimals + '</td>' +
                                    '</tr>');
      }
      
      idtab++;
    }
  }).catch(err => console.error(err));

  await myContract.userIDsA(addresact).call().then(IdUsA => {
    this.IdUser = IdUsA.id;
  }).catch(err => console.error(err));
  await myContract.referersA(this.IdUser).call().then(RefA => {
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

  await myContract.userIDsB(addresact).call().then(IdUsB => {
    // console.log({addresact});
    // console.log({IdUsB});
    var IdUser = parseInt(IdUsB.id);
    myContract.referersB(IdUser).call().then(RefB => {
      // console.log({RefB});
      $("#AmounEarnedRefB").text(RefB.amountEarn/decimals);
      $("#RefB0").text(RefB.level1);
      $("#RefB1").text(RefB.level2);
      $("#RefB2").text(RefB.level3);
      $("#RefB3").text(RefB.level4);
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));

  // var myHeaders = new Headers(); // Currently empty
  // myHeaders.get('Accept-Encoding'); // Returns 'gzip'
  // myHeaders.set('Content-Type', 'text/html');

  // xmlhttp = new XMLHttpRequest();
  // xmlhttp.open("GET", "https://tronscan.org/#/blockchain/nodes", false);
  // xmlhttp.send();
  // var data = JSON.parse(xmlhttp.responseText);
  // console.log(data);

  //Countdown
  await myContract.weekPeriodA().call().then(weekPeriodA => {
    this.weekPeriodA = weekPeriodA;
  }).catch(err => console.error(err));
  await myContract.weekPeriodB().call().then(weekPeriodB => {
    this.weekPeriodB = weekPeriodB;
  }).catch(err => console.error(err));

  var timeWA = this.weekPeriodA + 300; //604800
  timeWA = timeWA * 1000;
  // Set the date we're counting down to
  var countDownDate = new Date(timeWA).getTime();
  // Update the count down every 1 second
  var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;
    var Time = TimeCalculations(distance);
    $("#CountdownA").text(Time.days + " D / " + Time.hours + " H / " 
      + Time.minutes + " M / " + Time.seconds + " S ");

    if (distance < 0) {
      clearInterval(x);
      $("#CountdownA").text("PRIZE FOR PAYING");
    }
  }, 1000);

  var timeWB = this.weekPeriodB + 300; //604800
  timeWB = timeWB * 1000;
  // Set the date we're counting down to
  var countDownDateB = new Date(timeWB).getTime();
  // Update the count down every 1 second
  var x2 = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDateB - now;
    var Time = TimeCalculations(distance);
    $("#CountdownB").text(Time.days + " D / " + Time.hours + " H / " 
      + Time.minutes + " M / " + Time.seconds + " S ");

    if (distance < 0) {
      clearInterval(x2);
      $("#CountdownB").text("PRIZE FOR PAYING");
    }
  }, 1000);

  function TimeCalculations(distance) {
    var Times = {
      days : Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds : Math.floor((distance % (1000 * 60)) / 1000)
    };
    return Times;
  }
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

      var prizeA;
      var prizeB;
      var amountEarnRefA;
      var amountEarnRefB;
      var amounInvest;
      var withdrawn;
      var AVWithdraw;
      var AVWithdrawB;
      var totalpay;
      var totalAmountReInv;
      var activeB;
      var timepay;
      var payuser;
      var totalInvestors;
      var totalTronInvest;
      var totalInvestedUser;
      // var myContract = new XMLHttpRequest();
      const myContract = await tronWeb.contract().at(this.contractAddress);

      myContract.totalInvestorsA().call().then(totalInv => {
        this.totalInvestors = parseInt(totalInv);
        $("#Investors").text(this.totalInvestors);
      }).catch(err => console.error(err));

      myContract.totalInvestorsB().call().then(totalInvB => {
        var inv = parseInt(totalInvB);
        $("#InvestorsB").text(inv);
      }).catch(err => console.error(err));
	    
      myContract.totalTronInvestedA().call().then(totalInvested => {
        this.totalTronInvest = parseInt(totalInvested);
        $("#totalInvest").text(this.totalTronInvest/decimals);
      }).catch(err => console.error(err));

      myContract.totalTronInvestedB().call().then(totalInvestedB => {
        var totalInvB = parseInt(totalInvestedB);
        $("#totalInvestB").text(totalInvB/decimals);
      }).catch(err => console.error(err));

      myContract.BankAAwards().call().then(BankAAwards => {
        $("#WJackpot").text(BankAAwards/decimals);
      }).catch(err => console.error(err));

      myContract.BankBAwards().call().then(BankAAwards => {
        $("#WJackpotB").text(BankAAwards/decimals);
      }).catch(err => console.error(err));

      await myContract.idWeekA().call().then(idWeekA => {
        $("#Week").text(idWeekA);
      }).catch(err => console.error(err));

      await myContract.idWeekB().call().then(idWeekB => {
        $("#WeekB").text(idWeekB);
      }).catch(err => console.error(err));
      
      // myContract.totalInvestorsActive().call().then(totalInvActiv => {
      //   $("#totalActiveInvestors").text(totalInvActiv);
      // }).catch(err => console.error(err));

      await myContract.getPrizeA().call().then(PrizeA => {
        // console.log({PrizeA});
        for(var i = 0; i < PrizeA.i; i++) {
          $("#Pos"+i).text(convert_address(PrizeA.addr[i]));
          $("#Amount"+i).text(PrizeA.totalRef[i]);
        }
      }).catch(err => console.error(err));

      await myContract.getPrizeB().call().then(PrizeB => {
        // console.log({PrizeB});
        // if(PrizeB.i > 0) {
        for(var i = 0; i < PrizeB.i; i++) {
          $("#PosB"+i).text(convert_address(PrizeB.addr[i]));
          $("#AmountB"+i).text(parseInt(PrizeB.totalInvRef[i])/decimals);
        }
        // }
      }).catch(err => console.error(err));

      await myContract.getLastWeekA().call().then(LastWA => {
        // console.log({LastWA});
        for(var i = 0; i < LastWA.i; i++) {
          $("#LWPos"+i).text(convert_address(LastWA.addr[i]));
          $("#LWAmount"+i).text(parseInt(LastWA.totalEarn[i])/decimals);
          // sleep(10);
        }
      }).catch(err => console.error(err));

      await myContract.getLastWeekB().call().then(LastWB => {
        // console.log({LastWB});
        for(var i = 0; i < LastWB.i; i++) {
          $("#LWPosB"+i).text(convert_address(LastWB.addr[i]));
          $("#LWAmountB"+i).text(parseInt(LastWB.totalEarn[i])/decimals);
        }
      }).catch(err => console.error(err));

      myContract.bankA(addresact).call().then(bankA => {
        // console.log({bankA});
        this.amountEarnRefA = parseInt(bankA.amountEarnRef);
        this.withdrawn = parseInt(bankA.totalAmountPayments);
        
        this.AVWithdraw = parseInt(bankA.availableWithdraw);
        this.prizeA = parseInt(bankA.prize);
        this.pay = this.AVWithdraw+this.prizeA;

        $("#Invest").text(bankA.totalAmountInvest/decimals);
        $("#YourRef").text(bankA.countRef);
        $("#Withdrawn").text(this.withdrawn/decimals);
        $("#AVWithdraw").text((this.AVWithdraw+this.prizeA)/decimals);
      }).catch(err => console.error(err));

      myContract.bankB(addresact).call().then(bankB => {
        // console.log({bankB});
        this.activeB = bankB.active;
        this.amounInvest = parseInt(bankB.amountInvest);
        this.totalpay = parseInt(bankB.totalPaidInvestment);
        this.amountEarnRefB = parseInt(bankB.amountEarnRef);
        this.AVWithdrawB = parseInt(bankB.availableWithdraw);
        this.totalAmountReInv = parseInt(bankB.amountReInvest);
        this.totalAmountReInv += this.amounInvest;
        this.prizeB = parseInt(bankB.prize);
        // alert(bankB.amountInvest);
        $("#InvestB").text(bankB.amountInvest/decimals);
        $("#YourRefB").text(bankB.countRef);
        $("#WithdrawnB").text(bankB.totalAmountPayments/decimals);
      }).catch(err => console.error(err));

      myContract.subtractTimeB().call().then(timep => {
        this.timepay = parseInt(timep);

        var payuser = this.totalAmountReInv;

        // var payuser = this.totalAmountReInv * 2000 / 1000;//* 20 / 1000;
        payuser = payuser * 2000 / 1000//* 20 / 1000;
        payuser = payuser / 1200;//86400; day
        // if(this.timepay)
        payuser = (payuser * this.timepay);
        // payuser = payuser + this.AVWithdrawB; //Referidos
        
        payuser = payuser / decimals;
        this.payB = payuser;
        payuser = payuser.toFixed(6);
        var limit = this.amounInvest * 2;
        
        limit = limit - this.totalpay;
        limit = limit/decimals;
        // alert(this.activeB);
        if(this.activeB == false)
        {
          $("#AVWithdrawB").text(0);
        }
        else if(payuser <= limit)
        {
          payuser = payuser + this.prizeB;
          // payuser = payuser - this.totalpay;
          $("#AVWithdrawB").text(payuser);
        }
        else {
          payuser = this.amounInvest*2;
          payuser = payuser + this.prizeB;
          payuser = payuser - this.totalpay;
          $("#AVWithdrawB").text(payuser/decimals);
        }
      }).catch(err => console.error(err))

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
    // console.log({profit});
    alert(profit);
    
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
    var profitB = payB;
    // alert(payB);
    
    if(profitB > 0) {
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
