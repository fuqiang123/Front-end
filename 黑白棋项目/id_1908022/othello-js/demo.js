<div id="board"> </div>
<script>
let map = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 2, 1]
]
let color = 1;

let container = document.getElementById("board");
render();
function checkPass(){
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(move(i, j, true))
                return false;
        }
    }
    return true;
}
function move(i, j, checkOnly){
    if(map[i][j] > 0)
        return;
    let directions = [
        {x:-1, y:-1},
        {x:-1, y:0},
        {x:-1, y:1},
        {x:0, y:-1},
        {x:0, y:1},
        {x:1, y:-1},
        {x:1, y:0},
        {x:1, y:1}
    ]
    let moveSuccess = false;
    for(let direction of directions) {
        let canmove = false;
        let [x, y] = [j, i];
        while(true) {
            x += direction.x;
            y += direction.y;
            if(x < 0 || x >= 8 || y < 0 || y >= 8) {
                canmove = false;
                break;
            }
            if(map[y][x] == 3 - color) {
                canmove = true;
            } else if(map[y][x] == color) {
                break
            } else if(map[y][x] == 0) {
                canmove = false;
                break;
            }
        }

        moveSuccess = moveSuccess || canmove;

        if(canmove && !checkOnly) {
            while(true) {
                x -= direction.x;
                y -= direction.y;

                map[y][x] = color;
                if(x == j && y == i)
                    break;
            }
        }
        
    }

    return moveSuccess;

}
// 比赛结束，宣布结果
function resultAnnounce(){
    let m = 0,n = 0;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(map[i][j] == 1) m++;
            if(map[i][j] == 2) n++;
        }
        
    }
    console.log("黑子：" + m);
    console.log("白子：" + n);
    if(m > n){
        alert('黑子胜')
    }else{
        alert("白子胜")
    }
}
function render(){
    container.innerHTML = '';
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = document.createElement("div");
            container.appendChild(cell);
            cell.style = `vertical-align:middle;width:30px;margin:1px;
            height:30px;background-color:darkgreen;
            display:inline-block`;
            
            cell.addEventListener("click", event => {
                if(move(i, j, false)){
                    color = 3 - color;
                    if(checkPass()) {
                        console.log("pass");
                        color = 3 - color;
                        if(checkPass()) {
                            alert("Game over!");
                            resultAnnounce();
                        }
                    }
                    render();
                };
                
            })
            if(map[i][j]==1){
                let disc = document.createElement("div");
                disc.style = `margin:2px;border-radius:13px;
                width:26px;height:26px;background-color:black`
                cell.appendChild(disc);
            }
            if(map[i][j]==2){
                let disc = document.createElement("div");
                disc.style = `margin:2px;border-radius:13px;
                width:26px;height:26px;background-color:white`
                cell.appendChild(disc);
            }
        }
        container.appendChild(document.createElement("br"));   
    }
}

</script>