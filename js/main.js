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
var mov=-1;//AI move
var current_mode=1;//The default mode is two players mode..for vs computer mode;mode value will be 2
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
	if(whose_move==1 && winner==0)
	{
		check_space();
		if(ok==1)
		{
			document.getElementById(x).src="img/cross.png";
			whose_move=2;
			analyse();
			if(current_mode==2 && winner==0)
				aimove();
		}
		else
			alert("The square is already occupied.Please select another square");
		
	}
	else if(current_mode==1 && winner==0)
	{
		check_space();
		if(ok==1)
		{
			document.getElementById(x).src="img/o.png";
			whose_move=1;
			analyse();
		}
		else
			alert("The square is already occupied.Please select another square");
	}
} 

function aimove(){
	ok=0;
	var test;
	var mov=-1;
	aiwin();
	if(mov==-1)
	aiattack();
	if(mov==-1)
	{
		while(ok!=1)
		{
			mov=Math.floor((Math.random()*8)+0);
			test=String.fromCharCode(65+mov);
			check_space_ai();
		}
	}
	temp=String.fromCharCode(65+mov);
	check_space();
	document.getElementById(temp).src="img/o.png";
	whose_move=1;
	analyse();
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

function check_space_ai(){
	for(var i=0;i<9;i++)
	{
		if(mov==i && grid[i]==0)
		{
			ok=1;//if ok is one then it means that the space is safe
			break;
		}	
	}
	
}

function analyse(){
	check_winner();
	var pr1=document.getElementById("ai").innerHTML;
	var pr2=document.getElementById("human").innerHTML;
	if(winner==1)
	{
		alert(pr1+" won");
		if(pa_count==0)
		count_pl1_wins+=1;
		pa_count=1;
		
	}
	else if(winner==2)
	{
		alert(pr2+" won");
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
	if(winner>=1 && winner<=2)
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

function chmode(){//Changes mode from single player to double player and vice versa
	var p1=document.getElementById("ai").innerHTML;
	var p2=document.getElementById("human").innerHTML;
	if(p1=="Player 1" && p2=="Player 2")
	{
		document.getElementById("ai").innerHTML="Human";
		document.getElementById("human").innerHTML="Computer";
		current_mode=2;
	}
	else
	{
		document.getElementById("ai").innerHTML="Player 1";
		document.getElementById("human").innerHTML="Player 2";
		current_mode=1;	
	}
	playagain();
	count_pl1_wins=0;
	count_pl2_wins=0;
	count_ties=0;
	document.getElementById("p1").innerHTML=count_pl1_wins;
	document.getElementById("p2").innerHTML=count_pl2_wins;
	document.getElementById("tie").innerHTML=count_ties;
}

function aiwin(){
	var i,mul;
	for(i=0;i<7;i+=3)//horizontal rows
	{
		if(grid[i]==2 && grid[i+1]==2 && grid[i+2]==0)
			mov=i+2;
		else if(grid[i+1]==2 && grid[i+2]==2 && grid[i]==0)
			mov=i;
		else if(grid[i]==2 && grid[i+2]==2 && grid[i+1]==0)
			mov=i+1;
	}

	if(mov==-1)
	{
		for(i=0;i<=2;i++)//vertical rows
		{
			if(grid[i]==2 && grid[i+3]==2 && grid[i+6]==0)
				mov=i+6;
			else if(grid[i+3]==2 && grid[i+6]==2 && grid[i]==0)
				mov=i;
			else if(grid[i]==2 && grid[i+6]==2 && grid[i+3]==0)
				mov=i+3;	
		}	
	}
	
	if(mov==-1)
	{
		for(i=0;i<=2;i+=2)//criss-cross
		{
			if(i==0)
				mul=4;//multiplier for 0,4,8
			else
				mul=2;//multiplier for 2,4,6
			if(grid[i]==2 && grid[i+mul]==2 && grid[i+2*mul]==0)
				mov=i+2*mul;
			else if(grid[i+mul]==2 && grid[i+2*mul]==2 && grid[i]==0)
				mov=i;
			else if(grid[i]==2 && grid[i+2*mul]==2 && grid[i+mul]==0)
				mov=i+mul;	
		}
	}
}

function aiattack(){
	var i,mul;
	for(i=0;i<7;i+=3)//horizontal rows
	{
		if(grid[i]==1 && grid[i+1]==1 && grid[i+2]==0)
			mov=i+2;
		else if(grid[i+1]==1 && grid[i+2]==1 && grid[i]==0)
			mov=i;
		else if(grid[i]==1 && grid[i+2]==1 && grid[i+1]==0)
			mov=i+1;
	}

	if(mov==-1)
	{
		for(i=0;i<=2;i++)//vertical rows
		{
			if(grid[i]==1 && grid[i+3]==1 && grid[i+6]==0)
				mov=i+6;
			else if(grid[i+3]==1 && grid[i+6]==1 && grid[i]==0)
				mov=i;
			else if(grid[i]==1 && grid[i+6]==1 && grid[i+3]==0)
				mov=i+3;	
		}	
	}
	
	if(mov==-1)
	{
		for(i=0;i<=2;i+=2)//criss-cross
		{
			if(i==0)
				mul=4;//multiplier for 0,4,8
			else
				mul=2;//multiplier for 2,4,6
			if(grid[i]==1 && grid[i+mul]==1 && grid[i+2*mul]==0)
				mov=i+2*mul;
			else if(grid[i+mul]==1 && grid[i+2*mul]==1 && grid[i]==0)
				mov=i;
			else if(grid[i]==1 && grid[i+2*mul]==1 && grid[i+mul]==0)
				mov=i+mul;	
		}
	}
}