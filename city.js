const {xMAX,xMIN,yMIN,yMAX}= require('./constans.js');
class City {
	constructor(x, y, parent)
	{
	  if (x < xMIN || x > xMAX || y < yMIN || y > yMAX) {
		throw new Error("Incorrect city coordinates. Enter coordinates in the range from 1 to 10.");
	  } 
	  this.parent = parent;
	  this.account = [];

	  this.give = [];
	  this.take = [];
	  for(let i =0; i < this.parent.parent.info.length;i++)
	  {
		this.give.push({balance:0, country: this.parent.parent.info[i]});
		this.take.push({balance:0, country: this.parent.parent.info[i]});
		if(this.parent.parent.info[i]!== this.parent.name)
		{	
			this.account.push({balance:0, country: this.parent.parent.info[i]});
		}
		else if (this.parent.parent.info[i] === this.parent.name)
		{
			this.account.push({balance:1000000, country: this.parent.parent.info[i]});
		}
	  }
	  this.x = x;
	  this.y = y;
	}
	
	giveMoneyToANeighbor(city) 
	{
		let toGiveMoney = [];
		let oneCoin =[];
		for(let i =0; i < this.account.length;i++)
		{
			if(this.account[i].balance%1000 === 0)
			{
				toGiveMoney.push({balance : this.account[i].balance/1000, country: this.account[i].country});
			}
			else
			{
				toGiveMoney.push({balance : Math.floor(this.account[i].balance/1000), country: this.account[i].country});
				oneCoin.push({balance : (this.account[i].balance%1000), country: this.account[i].country});
			}
		}
		if(oneCoin.length!==0)
		{
			let randomIndex=0;
			for(let i=0;i<oneCoin.length;i++)
			{
				if(oneCoin[i].balance > oneCoin[randomIndex].balance)
				{
					randomIndex = i;
				}
			} 
			for(let i = 0;i< toGiveMoney.length;i++){
				if(oneCoin[randomIndex].country === toGiveMoney[i].country)
				{
					//toGiveMoney[i].balance+=1;
				}
			}
		}
		for(let i = 0;i< city.give.length;i++)
		{
				if(toGiveMoney[i].balance!== 0)
				{
					this.give[i].balance+=toGiveMoney[i].balance;
					city.take[i].balance+=toGiveMoney[i].balance;
				} 
		}
	}
	checkCompleteness() {
	  for(let i = 0;i<this.account.length;i++)
	  {
		if(this.account[i].balance === 0)
		{
			return false;
		}
	  }
	  return true;
	}
	goFromBufferToRealAccount(){
		for(let i =0;i< this.account.length;i++)
		{
					if(this.take[i].balance!== 0)
					{
						this.account[i].balance+= this.take[i].balance;
						this.take[i].balance =0;
					}
					if(this.give[i].balance!== 0)
					{
						this.account[i].balance-= this.give[i].balance;
						this.give[i].balance =0;
					}
		}
	}
  }

  module.exports = City;
  