function showhelp(){//Toggle function
	var x=document.getElementById("ins");
	if(x.style.display=="block")
		document.getElementById("ins").style.display="none";
	else
		document.getElementById("ins").style.display="block";
}

//Tic-tac-toe algorithm
//Global variables
var grid=new Array();
for(var i=0;i<9;i++)
	grid[i]=0;
var temp='';
var ok;
var whose_move=1;
var winner=0;
var count_pl1_wins=0;
var count_pl2_wins=0;
var count_ties=0;
var pa_count=0;
var winarr=new Array();//holds those value where there is three square match
for(var i=0;i<3;i++)
winarr[i]='N';//N for no match

function playagain(){
	for(var i=0;i<3;i++)
		winarr[i]='N';
	for(var i=0;i<9;i++)
		grid[i]=0;
	whose_move=1;
	pa_count=0;
	document.getElementById("p1").innerHTML=count_pl1_wins;
	document.getElementById("p2").innerHTML=count_pl2_wins;
	document.getElementById("tie").innerHTML=count_ties;
	var arr=['A','B','C','D','E','F','G','H','I'];
	for(var i=0;i<9;i++)
		document.getElementById(arr[i]).src="img/blank.jpg";
	winner=0;
}

//This function is used to put cross or circle
function Move(x){
	temp=x;
	ok=0;
	if(whose_move==1)
	{
		check_space();
		if(ok==1)
		{
			document.getElementById(x).src="img/cross.png";
			whose_move=2;
			process();
		}
		else
			alert("The square is already occupied.Please select another square");
	}
	else
	{
		check_space();
		if(ok==1)
		{
			document.getElementById(x).src="img/o.png";
			whose_move=1;
			process();
		}
		else
			alert("The square is already occupied.Please select another square");
	}
} 

//This function makes sure that the space is not already pre-occupied
function check_space(){
	var arr=['A','B','C','D','E','F','G','H','I'];
	for(var i=0;i<9;i++)
	{
		if(temp==arr[i] && grid[i]==0)
		{
			ok=1;//if ok is one then it means that the space is safe
			if(whose_move==1) grid[i]=1;
			if(whose_move==2) grid[i]=2;
			break;
		}	
	}
	
}

function process(){
	check_winner();
	if(winner==1)
	{
		alert("Player 1 won");
		if(pa_count==0)
		count_pl1_wins+=1;
		pa_count=1;
		
	}
	else if(winner==2)
	{
		alert("Player 2 won");
		if(pa_count==0)
		count_pl2_wins+=1;
		pa_count=1;
	}
	else if(winner==3)
	{
		alert("It is a Tie");
		if(pa_count==0)
		count_ties+=1;
		pa_count=1;
	}
	document.getElementById("p1").innerHTML=count_pl1_wins;
	document.getElementById("p2").innerHTML=count_pl2_wins;
	document.getElementById("tie").innerHTML=count_ties;
	if(winner!=0 || winner!=3)
	{
		for(var i=0;i<3;i++)
		{
			document.getElementById(winarr[i]).src="img/crown.png";
		}
	}
}

function check_winner()
{
	if(grid[0]==grid[1] && grid[1]==grid[2] && (grid[0]==1 || grid[0]==2))
		{
			winner=grid[0];
			winarr=['A','B','C'];
		}
	else if(grid[3]==grid[4] && grid[4]==grid[5] && (grid[3]==1 || grid[3]==2))
		{
			winner=grid[3];
			winarr=['D','E','F'];
		}
	else if(grid[6]==grid[7] && grid[7]==grid[8] && (grid[6]==1 || grid[6]==2))
		{
			winner=grid[6];
			winarr=['G','H','I'];
		}
	else if(grid[0]==grid[3] && grid[3]==grid[6] && (grid[0]==1 || grid[0]==2))
		{
			winner=grid[0];
			winarr=['A','D','G'];
		}
	else if(grid[1]==grid[4] && grid[4]==grid[7] && (grid[1]==1 || grid[1]==2))
		{
			winner=grid[1];
			winarr=['B','E','H'];
		}
	else if(grid[2]==grid[5] && grid[5]==grid[8] && (grid[2]==1 || grid[2]==2))
		{
			winner=grid[2];
			winarr=['C','F','I'];
		}
	else if(grid[0]==grid[4] && grid[4]==grid[8] && (grid[0]==1 || grid[0]==2))
		{
			winner=grid[0];
			winarr=['A','E','I'];
		}
	else if(grid[2]==grid[4] && grid[4]==grid[6] && (grid[2]==1 || grid[2]==2))
		{
			winner=grid[2];
			winarr=['C','E','G'];
		}
	else if(grid[0]!=0 && grid[1]!=0 && grid[2]!=0 && grid[3]!=0 && grid[4]!=0 && grid[5]!=0 && grid[6]!=0 && grid[7]!=0 && grid[8]!=0 && winner==0)
		winner=3;
}