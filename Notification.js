var Notification=function(){
	this.preId="",this.notificationCounter=0;
    var idStr = "abcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 5; i++ ){
        this.preId += idStr.charAt(Math.floor(Math.random() * idStr.length));
    }
    var preId=this.preId;
	$("<div/>",{
		id:preId+"-notification-container",
		css:{
			height:'auto',
			width:'400px',
			position:'fixed',
			bottom:'50px',
			left:'100px',
			overflow:"hidden"
		},
		html:'<style>.'+preId+'-notification-title,.'+preId+'-notification-message{margin:0;padding:0;}</style>'
	}).appendTo("body");
}
Notification.prototype.notify=function(notification){
	
	var preId=this.preId,
	$notify=this,
	title="",
	message="",
	background="#ddd",
	textColor="#000",
	html="",
	progressDiv="",
	timeOut=4000,
	onClose=null,
	notificationId;

	try{
		if(notification.title){title=notification.title};
		if(notification.message){message=notification.message};
		if(notification.background){background=notification.background};
		if(notification.textColor){textColor=notification.textColor};
		if(notification.html){html=notification.html};
		if(notification.timeOut){
			timeOut=notification.timeOut;
			if(notification.timeOut<0){
				timeOut=0;
			}
		};
		if(notification.onClose){onClose=notification.onClose;};
		if(notification.id){notificationId=notificationId}else{notificationId=this.preId+"-"+(++this.notificationCounter);}
		if(notification.interval){clearInterval(notification.interval);}
		if(notification.progressBar){
			var pBackground="rgba(0,0,0,0.2)";
			var pForground="#1abc9c";
			var pProgress=1;
			if(notification.progressBar.background){pBackground=notification.progressBar.background;}
			if(notification.progressBar.forground){pForground=notification.progressBar.forground;}
			if(notification.progressBar.progress){pProgress=notification.progressBar.progress;}
			progressDiv='<div style="width:100%;height:5px;background:'+pBackground+';box-shadow:inset 0 1px 1px rgba(0,0,0,0.3);border-radius:5px;"><div style="width:'+pProgress+'%;height:5px;background:'+pForground+';border-radius:5px;"></div></div>';
		};
		
	}catch(e){}
	var nDiv;
	if(notification.div){
		nDiv=$(notification.div)[0];

		$(nDiv).css({
			background:background
		});
		$(nDiv).find("p."+preId+"-notification-message").html(message);
		$(nDiv).find("h3."+preId+"-notification-title").html(title);
		$(nDiv).find("div."+preId+"-notification-html").html(html);
		$(nDiv).find("div."+preId+"-notification-progress").html(progressDiv);
	}else{
		nDiv=document.createElement("div");
		nDiv.id=notificationId;
		nDiv.classList.add(preId+"-notification-box");
		var nSpan=document.createElement("span");
		$(nSpan).css({
			float:'right',cursor:'pointer',display:'block',background:'rgba(0,0,0,0)',borderRadius:'100px',width:'15px',height:'15px',textAlign:'center',
		});
		$(nSpan).html("<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='15' height='15' viewBox='0 0 512 512'><g></g><path d='M256.010 204.645l100.118-100.146 51.344 51.33-100.118 100.146-51.344-51.329z' fill='#000000' /><path d='M155.827 407.483l-51.344-51.358 100.161-100.132 51.344 51.358-100.161 100.132z' fill='#000000' /><path d='M407.498 356.112l-51.373 51.358-100.118-100.146 51.373-51.358 100.118 100.146z' fill='#000000' /><path d='M104.502 155.857l51.337-51.351 100.153 100.125-51.337 51.351-100.153-100.125z' fill='#000000' /><path d='M255.983 307.36l-51.351-51.365 51.365-51.351 51.351 51.365-51.365 51.351z' fill='#000000' /></svg>");
		$(nDiv).append($(nSpan));
		$(nDiv).css({
				display:'none',background:background,borderRadius:'5px',boxShadow:'0 0 5px rgba(0,0,0,0.5)',width:"100%",height:"auto",padding:"10px",margin:"7px 0",
		});
		$(nDiv).append(""
			+"<h3 class='"+preId+"-notification-title' style='color:"+textColor+"'>"+title+"</h3>"
			+"<p class='"+preId+"-notification-message' style='color:"+textColor+"'>"+message+"</p>"
			+"<div class='"+preId+"-notification-html'>"+html+"</div>"
			+"<div class='"+preId+"-notification-progress'>"+progressDiv+"</div>");
		$("#"+preId+"-notification-container").append($(nDiv));
		nSpan.onclick=function(e){
			$(e.target).closest("."+preId+"-notification-box")
						.fadeOut(function(){
							$(this).remove();
						});
		}
		$(nDiv).fadeIn();
		
		notification.update=function(notification){
			if(notification.message){this.message=notification.message;}
			if(notification.title){this.title=notification.title;}
			if(notification.background){this.background=notification.background;}
			if(notification.textColor){this.textColor=notification.textColor;}
			if(notification.html){this.html=notification.html;}
			if(notification.timeOut){this.timeOut=notification.timeOut;}
			if(notification.onClose){this.onClose=notification.onClose;}
			if(notification.progressBar){this.progressBar=notification.progressBar;}
			$notify.notify(this);
			return this;
		}
		notification.close=function(){
			clearInterval(this.interval);
			$(this.div).fadeOut(function(){
				$(this).remove();
			});
		}
		
	}
	
	notification.div=nDiv;
	if(timeOut!=0){
	notification.interval=setTimeout(function(){
			$(nDiv).fadeOut(function(){
				if(typeof(onClose)=="function"){
					onClose(notification);
				}
				$(nDiv).remove();
			});
		},timeOut);	
	}
	notification.id=notificationId;

	return notification;
}


