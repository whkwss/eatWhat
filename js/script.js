// This file contains the JavaScript code that implements the spinning wheel functionality.

const foods = [
    { name: "稀土餐厅", probability: 10 },
    { name: "饺子", probability: 20 },
    { name: "传音", probability: 10 },
    { name: "八刀汤", probability: 15 },
    { name: "鲜湘味", probability: 15 },
    { name: "秋收里", probability: 15 },
    { name: "老家饭堂", probability: 15 }
];

// 生成随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 创建转盘
function createWheel() {
    const wheel = document.getElementById('wheel');
    let currentAngle = 0;
    let gradient = [];
    const angleMap = [];

    foods.forEach((food) => {
        const angle = (food.probability / 100) * 360;
        const color = getRandomColor();
        gradient.push(`${color} ${currentAngle}deg ${currentAngle + angle}deg`);
        
        const text = document.createElement('div');
        text.className = 'text';
        text.textContent = food.name;
        
        const middleAngle = currentAngle + angle / 2;
        const textAngle = middleAngle > 180 ? middleAngle - 180 : middleAngle;
        
        text.style.transform = `
            rotate(${middleAngle}deg) 
            translate(0, -120px) 
        `;
        text.style.transformOrigin = 'center center';
        text.style.writingMode = 'vertical-rl';
        
        wheel.appendChild(text);
        angleMap.push({ 
            start: currentAngle, 
            end: currentAngle + angle,
            name: food.name
        });
        currentAngle += angle;
    });

    wheel.style.background = `conic-gradient(${gradient.join(', ')})`;
    return angleMap;
}

// 旋转函数
function spin() {
    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('result');
    
    const rotations = Math.floor(Math.random() * 3 + 3);
    const stopAngle = 360 * rotations + Math.random() * 360;
    wheel.style.transform = `rotate(-${stopAngle}deg)`;
    
    wheel.ontransitionend = () => {
        const actualAngle = ((stopAngle) % 360); 
        const selected = angleMap.find(a => 
            actualAngle >= a.start && actualAngle < a.end
        );
        resultDiv.textContent = `今天吃：${selected.name}`;
    };
}

// 初始化转盘
const angleMap = createWheel();