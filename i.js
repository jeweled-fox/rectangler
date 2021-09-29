c = document.querySelector("#c")

c.width = window.innerWidth; c.height = window.innerHeight;

cr = document.querySelector("#createbutton")
color = document.querySelector("#color")
angle = document.querySelector("#angle")

clickx1 = null
clicky1 = null

clickx2 = null
clicky2 = null

dsaincorrectang = true

actionarray = []

ctx = c.getContext("2d")

watermark = "Rectangler"

function appendactionarray() {
	actionarray.push(c.toDataURL())
	if (actionarray.length > 0) {
		document.querySelector("#undo").disabled = false
	}
}

function undo(e) {
	if (actionarray.length > 0) {
		e.disabled = false
		ctx.clearRect(0,0,c.width, c.height)
		actionimg = document.createElement("img")
		actionimg.src = actionarray[actionarray.length - 1]
		document.body.appendChild(actionimg)
		actionimg.onload = () => {
			console.log("actionimg loaded")
			ctx.drawImage(actionimg, 0, 0)
			actionimg.remove()
		}
		actionarray.splice(actionarray.length - 1)
	} else {
		e.disabled = true
	}
}

document.fonts.load("30px comicsans").then(() => {
		iconimg = document.createElement("img")
		iconimg.src = "f.png"
		iconimg.crossOrigin = "Anonymous"
		document.body.appendChild(iconimg)
		
		iconimg.onload = () => {
			ctx.drawImage(iconimg, 10, 10, 50, 50)
			iconimg.remove()
		

		ctx.font = "30px comicsans"
		ctx.fillStyle = "gray"
		ctx.fillText(watermark, 70,  50)
		ctx.strokeStyle = "gray"
		ctx.strokeText(watermark, 69,  50)
		}
	})

document.addEventListener('keydown', function(e) {
	if (e.key == "Enter") {
		if (cr.disabled == false) {
			cr.click()
		}
	}
})

function createrect(e) {
	cr.disabled = false
	ctx = c.getContext("2d");
	ctx.strokeStyle = color.value
	ctx.fillStyle = color.value
	
	midpointx = ((clickx2 - clickx1) / 2)
	midpointy = ((clicky2 - clicky1) / 2)
	
	

	ctx.translate(midpointx + clickx1, midpointy + clicky1)
	
	if (angle.value > -361 && angle.value < 361) {	
		ctx.rotate(parseInt(angle.value) * Math.PI / 180)
	}else {
		if (dsaincorrectang == true) {
			dsaincorrectang = confirm("Invalid angle measure, shape not rotated. Press cancel to not show this again.")
		}
	}


	if (document.querySelector("#fill").checked == false) {
		ctx.strokeRect(-midpointx,-midpointy,midpointx*2, midpointy*2)
	} else {
		ctx.fillRect(-midpointx,-midpointy,midpointx*2, midpointy*2)
	}
	ctx.resetTransform()
	
	appendactionarray()
	
}

function setclick2xy(e) {
	clickx2 = e.clientX
	clicky2 = e.clientY
	document.querySelector("#selectedx2").innerText = clickx2
	document.querySelector("#selectedy2").innerText = clicky2
	c.onclick = ""
	c.style.cursor = ""
	cr.disabled = false
	cr.onclick = createrect
	
}

function setclick1xy(e) {
	clickx1 = e.clientX
	clicky1 = e.clientY
	document.querySelector("#selectedx").innerText = clickx1
	document.querySelector("#selectedy").innerText = clicky1
	c.onclick = setclick2xy
}

function makerect(e) {
	if (e.innerText == "Make rectangle") {
		e.innerText = "Stop"
		c.style.cursor = "crosshair"
		c.onclick = setclick1xy;

	} else {
		e.innerText = "Make rectangle"
		c.style.cursor = ""
		c.onclick = ""
		cr.onclick = ""
		cr.disabled = true		

		clickx1 = 0
		clicky1 = 0

		clickx2 = 0
		clicky2 = 0

		document.querySelector("#selectedx").innerText = clickx1
		document.querySelector("#selectedy").innerText = clicky1
		document.querySelector("#selectedx2").innerText = clickx2
		document.querySelector("#selectedy2").innerText = clicky2
	}
}

function saveimg() {
	document.fonts.load("30px comicsans").then(() => {
		iconimg = document.createElement("img")
		iconimg.src = "f.png"
		iconimg.crossOrigin = "Anonymous"
		document.body.appendChild(iconimg)
		
		iconimg.onload = () => {
			ctx.drawImage(iconimg, 10, 10, 50, 50)
			iconimg.remove()
		

		ctx.font = "30px comicsans"
		ctx.fillStyle = "gray"
		ctx.fillText(watermark, 70,  50)
		ctx.strokeStyle = "gray"
		ctx.strokeText(watermark, 69,  50)

		dataurl = c.toDataURL()
		invisiblelink = document.createElement("a")
		invisiblelink.href = dataurl
		invisiblelink.download = "Drawing"
		invisiblelink.click()
		}
	})
}

console.log("appending first")
appendactionarray()
