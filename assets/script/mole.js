class Mole 
{
    constructor(mesh)
    {
        this.mesh = mesh;
        this.isOut = false;
        this.upTimer;
        this.waitTimer;
        this.downTimer;
    }

    // called when mole is next to go out
    appear() 
    {
        console.log("appear");
        this.isOut = true;
        this.animUp(-0.1);
    }

    // animations mole up and down
    animUp(pos)
    {
        let outTime = (Math.floor(Math.random() * 3) + 1) * 1000;

        this.upTimer = setInterval(() => {
            this.mesh.position.y += 0.01
            console.log("up");

            if (this.mesh.position.y > pos)
            {
                clearInterval(this.upTimer);
                this.waitTimer = setTimeout(() => {
                    this.animDown();
                }, outTime);
            }
        }, 10);
    }

    animDown()
    {
        this.downTimer = setInterval(() => {
            this.mesh.position.y -= 0.01
            console.log("down");

            if (this.mesh.position.y <= -0.2)
            {
                clearInterval(this.downTimer);
                this.isOut = false;
                let i = molesOut.indexOf(this);
                molesOut.splice(i, 1);
            }
        }, 10);
    }

    // raycast called when click = check if aiming mole and if mole is out for point
    raycast()
    {
        const intersection = raycaster.intersectObject(this.mesh, true);

        if (intersection.length > 0 && this.isOut)
        {
            score += 1
            scoreDisplay.textContent = score;
            clearInterval(this.upTimer);
            clearTimeout(this.waitTimer);
            this.animDown();
        }
    }
}