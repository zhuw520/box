//The architectural logic and original implementation are copyrighted by(zhu)(2745994601@qq.com) the author, while third-party libraries and resources retain their respective licenses.
// ==================== 字体切换插件 font-switcher.js ====================
// 功能：1.默认加载站酷小薇体 2.三击屏幕切换字体
// 用法：<script src="font-switcher.js"></script>
//If you need to transfer or modify this code, you must retain this copyright notice and attribution.
(function() {
    'use strict';
    
    // ========== 字体配置 ==========
    const FONTS = [
        {
            id: 'liu-jian-mao-cao',
            name: '刘江茅草体',
            family: "'Liu Jian Mao Cao', cursive",
            import: "@import url('https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap');"
        },
        {
            id: 'ma-shan-zheng',
            name: '马善政手写体',
            family: "'Ma Shan Zheng', cursive",
            import: "@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');"
        },
        {
            id: 'noto-sans-sc',
            name: '思源黑体',
            family: "'Noto Sans SC', sans-serif",
            import: "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap');"
        },
        {
            id: 'noto-serif-sc',
            name: '思源宋体',
            family: "'Noto Serif SC', serif",
            import: "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap');"
        },
        {
            id: 'zcool-kuaile',
            name: '站酷快乐体',
            family: "'ZCOOL KuaiLe', cursive",
            import: "@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');"
        },
        {
            id: 'zcool-xiaowei',
            name: '站酷小薇体',
            family: "'ZCOOL XiaoWei', serif",
            import: "@import url('https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap');"
        },
        {
            id: 'zcool-qingke',
            name: '站酷庆科黄油体',
            family: "'ZCOOL QingKe HuangYou', cursive",
            import: "@import url('https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap');"
        },
        {
            id: 'noto-sans-tc',
            name: '思源黑体(繁体)',
            family: "'Noto Sans TC', sans-serif",
            import: "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');"
        },
        {
            id: 'noto-sans-hk',
            name: '思源黑体(香港)',
            family: "'Noto Sans HK', sans-serif",
            import: "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+HK&display=swap');"
        },
        {
            id: 'system-default',
            name: '系统默认',
            family: "-apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif",
            import: ""
        }
    ];
    
    // ========== 核心功能 ==========
    let clickCount = 0;
    let clickTimer = null;
    let currentFontIndex = 0;
    
    // 1. 初始化：设置默认字体为刘江茅草体
    function initDefaultFont() {
        // 找到刘江茅草体的索引
        currentFontIndex = FONTS.findIndex(font => font.id === 'zcool-xiaowei');
        if (currentFontIndex === -1) currentFontIndex = 0;
        
        // 加载默认字体
        loadFont(FONTS[currentFontIndex]);
        applyFont(FONTS[currentFontIndex]);
        
        console.log('默认字体已设置为：刘江茅草体');
    }
    
    // 2. 加载字体CSS
    function loadFont(font) {
        if (!font.import) return;
        
        // 检查是否已加载
        const fontId = `font-${font.id}`;
        if (document.getElementById(fontId)) return;
        
        // 创建style标签加载字体
        const style = document.createElement('style');
        style.id = fontId;
        style.textContent = font.import;
        document.head.appendChild(style);
    }
    
    // 3. 应用字体到整个页面
    function applyFont(font) {
        // 创建或更新全局字体样式
        let style = document.getElementById('global-font-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'global-font-style';
            document.head.appendChild(style);
        }
        
        // 应用字体（排除FontAwesome图标）
        style.textContent = `
            body, body *:not(i):not(.fa):not(.fas):not(.far):not(.fal):not(.fab):not([class*="icon"]) {
                font-family: ${font.family} !important;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        `;
        
        // 保存到localStorage
        try {
            localStorage.setItem('selected-font-id', font.id);
            localStorage.setItem('selected-font-index', currentFontIndex.toString());
        } catch (e) {
            // 隐私模式等情况下忽略
        }
        
        console.log(`已切换字体：${font.name}`);
    }
    
    // 4. 切换到下一个字体
    function switchToNextFont() {
        currentFontIndex = (currentFontIndex + 1) % FONTS.length;
        const nextFont = FONTS[currentFontIndex];
        
        loadFont(nextFont);
        applyFont(nextFont);
        
        // 显示简短提示
        showQuickTip(`字体已切换：${nextFont.name}`);
    }
    
    // 5. 三击检测
    function handleClick() {
        clickCount++;
        
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500); // 500毫秒内完成三次点击
        
        if (clickCount === 3) {
            clickCount = 0;
            clearTimeout(clickTimer);
            switchToNextFont();
        }
    }
    
    // 6. 显示简短提示
    function showQuickTip(message) {
        // 移除旧提示
        const oldTip = document.getElementById('quick-font-tip');
        if (oldTip) oldTip.remove();
        
        // 创建新提示
        const tip = document.createElement('div');
        tip.id = 'quick-font-tip';
        tip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 999999;
            animation: slideIn 0.3s, fadeOut 0.3s 1.5s forwards;
            pointer-events: none;
        `;
        
        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        tip.textContent = message;
        document.body.appendChild(tip);
        
        // 2秒后移除
        setTimeout(() => {
            if (tip.parentNode) {
                tip.remove();
            }
        }, 2000);
    }
    
    // 7. 恢复上次选择的字体
    function restorePreviousFont() {
        try {
            const savedFontId = localStorage.getItem('selected-font-id');
            const savedIndex = localStorage.getItem('selected-font-index');
            
            if (savedFontId && savedIndex !== null) {
                const index = parseInt(savedIndex);
                if (index >= 0 && index < FONTS.length) {
                    currentFontIndex = index;
                    const font = FONTS[index];
                    loadFont(font);
                    applyFont(font);
                    console.log(`恢复上次字体：${font.name}`);
                    return true;
                }
            }
        } catch (e) {
            // 忽略错误
        }
        return false;
    }
    
    // ========== 初始化 ==========
    function init() {
        // 等待页面加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // 先尝试恢复上次选择的字体
        const restored = restorePreviousFont();
        
        // 如果没有恢复成功，使用默认字体
        if (!restored) {
            initDefaultFont();
        }
        
        // 绑定点击事件
        document.addEventListener('click', handleClick);
        
        // 预加载所有字体（可选）
        setTimeout(() => {
            FONTS.forEach(font => loadFont(font));
        }, 1000);
        
        console.log('字体切换插件已加载');
        console.log('连续点击屏幕三次切换字体');
        console.log(`可用字体：${FONTS.length}种`);
    }
    
    // ========== 暴露API（可选） ==========
    window.FontSwitcher = {
        switchFont: switchToNextFont,
        getCurrentFont: () => FONTS[currentFontIndex],
        getAllFonts: () => [...FONTS],
        setFontById: (id) => {
            const index = FONTS.findIndex(font => font.id === id);
            if (index !== -1) {
                currentFontIndex = index;
                const font = FONTS[index];
                loadFont(font);
                applyFont(font);
                showQuickTip(`字体已切换：${font.name}`);
            }
        }
    };
    
    // 启动
    init();
    
})();