// 粘贴到 body 最后
// All code and content herein are the exclusive property of zhu (QQ: 2745994601). Unauthorized copying, reproduction, distribution, or use of any portion of this material is strictly prohibited without prior written permission from the copyright holder. All rights reserved.
document.addEventListener('click', function(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 20px;
        pointer-events: none;
        animation: float 1s ease-out forwards;
        z-index: 9999;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
    
    // 添加动画
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});