// enhanced-loader.js
//zhu(2745994601@qq.com)版权所有，未经允许不得使用
(function() {
    'use strict';
    
    const loadingTips = [
        " 正在初始化音乐播放器...",
        " 准备高性能聊天室...",
        " 加载MD3设计系统...",
        " 优化WebSocket连接...",
        " 检查网络状态...",
        " 准备扩展功能...",
        " 加载核心组件...",
        " 即将完成...",
        " 正在准备界面...",
        " 加载夜间模式支持..."
    ];
    
    // 😍😍😍
    const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
    
    // 创建全屏加载遮罩
    const loaderHTML = `
        <div id="fullscreen-loader" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Microsoft YaHei', sans-serif;
            transition: opacity 0.5s ease;
            overflow: hidden;
        ">
            <!-- 背景装饰 -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, 
                    rgba(103, 80, 164, 0.05) 0%, 
                    rgba(255, 255, 255, 0.05) 50%,
                    rgba(103, 80, 164, 0.05) 100%);
                background-size: 400% 400%;
                animation: gradientBG 8s ease infinite;
            "></div>
            
            <!-- 主加载区 -->
            <div style="
                position: relative;
                z-index: 2;
                text-align: center;
                padding: 40px 50px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                box-shadow: 
                    0 10px 40px rgba(103, 80, 164, 0.15),
                    inset 0 0 0 1px rgba(103, 80, 164, 0.1);
                border: 1px solid rgba(103, 80, 164, 0.2);
                min-width: 300px;
                max-width: 90vw;
            ">
                <!-- 双环加载动画 -->
                <div style="
                    position: relative;
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 25px;
                ">
                    <!-- 外圈 -->
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 3px solid rgba(103, 80, 164, 0.1);
                        border-top: 3px solid #6750A4;
                        border-radius: 50%;
                        animation: spin 1.2s linear infinite;
                    "></div>
                    
                    <!-- 内圈 -->
                    <div style="
                        position: absolute;
                        top: 15px;
                        left: 15px;
                        width: 40px;
                        height: 40px;
                        border: 2px solid transparent;
                        border-top: 2px solid #FF8A8A;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite reverse;
                    "></div>
                    
                    <!-- 中心点 -->
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 8px;
                        height: 8px;
                        background: #6750A4;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(103, 80, 164, 0.5);
                    "></div>
                </div>
                
                <!-- 应用名称 -->
                <div style="
                    font-size: 18px;
                    font-weight: 600;
                    color: #6750A4;
                    margin-bottom: 8px;
                    letter-spacing: 0.5px;
                ">
                    <i class="fas fa-comments" style="margin-right: 8px;"></i>
                    高性能聊天室
                </div>
                
                <!-- 随机提示语 -->
                <div style="
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 25px;
                    line-height: 1.5;
                    min-height: 21px;
                ">
                    ${randomTip}
                </div>
                
                <!-- 进度条容器 -->
                <div style="
                    width: 100%;
                    height: 6px;
                    background: rgba(103, 80, 164, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    margin-bottom: 15px;
                ">
                    <div id="loader-progress" style="
                        width: 0%;
                        height: 100%;
                        background: linear-gradient(90deg, #6750A4 0%, #FF8A8A 100%);
                        border-radius: 3px;
                        transition: width 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    ">
                        <div style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: linear-gradient(90deg, 
                                transparent 0%, 
                                rgba(255, 255, 255, 0.4) 50%, 
                                transparent 100%);
                            animation: shimmer 1.5s infinite linear;
                        "></div>
                    </div>
                </div>
                
                <!-- 倒计时和进度 -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    color: #888;
                ">
                    <div>
                        <i class="fas fa-clock" style="margin-right: 5px;"></i>
                        剩余: <span id="countdown">4</span>秒
                    </div>
                    <div id="progress-percent">0%</div>
                </div>
            </div>
            
            <!-- 底部版权 -->
            <div style="
                position: absolute;
                bottom: 20px;
                left: 0;
                right: 0;
                text-align: center;
                color: rgba(103, 80, 164, 0.7);
                font-size: 12px;
                z-index: 2;
            ">
                © ZHU.QQ274*↙ | 正在努力加载中...
            </div>
        </div>
        
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            #fullscreen-loader.fade-out {
                opacity: 0;
                pointer-events: none;
            }
        </style>
    `;
    
    // 注入遮罩到页面
    function injectLoader() {
        // 立即添加到body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        
        // 开始进度动画
        startProgressAnimation();
        
        // 开始倒计时
        startCountdown();
        
        // 4秒后移除
        setTimeout(removeLoader, 4000);
    }
    
    // 进度条动画
    function startProgressAnimation() {
        let progress = 0;
        const progressEl = document.getElementById('loader-progress');
        const percentEl = document.getElementById('progress-percent');
        
        if (!progressEl || !percentEl) return;
        
        // 模拟进度
        const interval = setInterval(() => {
            progress += Math.random() * 10 + 5; // 随机增加5-15%
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
            }
            
            progressEl.style.width = progress + '%';
            percentEl.textContent = Math.round(progress) + '%';
        }, 200); // 每200ms更新一次
        
        // 4秒后确保100%
        setTimeout(() => {
            progressEl.style.width = '100%';
            percentEl.textContent = '100%';
            clearInterval(interval);
        }, 3800);
    }
    
    // 倒计时函数
    function startCountdown() {
        let count = 4;
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;
        
        const timer = setInterval(() => {
            count--;
            countdownEl.textContent = count;
            
            if (count <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
    
    // 移除遮罩函数
    function removeLoader() {
        const loader = document.getElementById('fullscreen-loader');
        if (loader) {
            // 先添加淡出效果
            loader.classList.add('fade-out');
            
            // 等待动画完成后移除
            setTimeout(() => {
                loader.remove();
                console.log('✅ 全屏加载遮罩已移除');
                
                // 触发自定义事件（可选）
                document.dispatchEvent(new CustomEvent('loaderRemoved'));
            }, 500);
        }
    }
    
    // 主执行逻辑
    function initLoader() {
        // 确保document.body存在
        if (!document.body) {
            // 如果body还不存在，等待一下
            setTimeout(initLoader, 50);
            return;
        }
        
        // 立即注入遮罩
        injectLoader();
        
        // 可选：如果所有资源提前加载完成，可以提前移除
        if (document.readyState === 'complete') {
            // 如果页面已经加载完成，提前移除（但至少显示2秒）
            setTimeout(removeLoader, 2000);
        } else {
            // 监听页面完全加载，但至少显示2秒
            window.addEventListener('load', function() {
                // 确保至少显示2秒
                const minDisplayTime = 2000;
                const elapsed = Date.now() - window.loaderStartTime;
                const remaining = Math.max(minDisplayTime - elapsed, 0);
                
                setTimeout(removeLoader, remaining);
            });
            
            // 记录开始时间
            window.loaderStartTime = Date.now();
        }
    }
    
    // 立即开始（不等待DOMContentLoaded）
    if (document.readyState === 'loading') {
        // 如果文档还在加载，立即开始
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        // 如果文档已经加载完成，立即执行
        initLoader();
    }
    
    // 提供外部控制接口
    window.chatLoader = {
        show: injectLoader,
        hide: removeLoader,
        setTip: function(newTip) {
            const tipEl = document.querySelector('#fullscreen-loader div:nth-child(2)');
            if (tipEl) {
                tipEl.innerHTML = newTip;
            }
        },
        setDuration: function(seconds) {
            const loader = document.getElementById('fullscreen-loader');
            if (loader) {
                setTimeout(removeLoader, seconds * 1000);
            }
        }
    };
    
    console.log('加载器已初始化');
})();