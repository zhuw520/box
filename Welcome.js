// Copyright by author Zhu (2745994601@qq.com)
// If you need to transfer or modify this code, you must retain this copyright notice and attribution.
class TypeWriterPlugin {
    constructor(options = {}) {
        this.config = {
            // 文本内容
            texts: options.texts || ["欢迎来到我的网站", "这里有很多有趣的内容", "尽情探索吧！"],
            
            // 位置设置
            position: options.position || {
                top: '30px',
                left: '20px'
            },
            
            // 渐变字体样式（使用你提供的流光效果）
            fontStyle: options.fontStyle || {
                fontSize: '17px', // 原来的一半
                fontWeight: '600',
                background: 'linear-gradient(45deg, #b3e5fc, #ce93d8, #a5d6a7, #81d4fa, #f8bbd0, #e1f5fe)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 3px currentColor',
                animation: 'neon 6s infinite alternate, blink 5s infinite'
            },
            
            // 动画速度
            typingSpeed: options.typingSpeed || 120,
            deletingSpeed: options.deletingSpeed || 60,
            pauseTime: options.pauseTime || 2500,
            
            // 光标设置
            cursor: options.cursor || {
                enabled: true,
                char: '|',
                color: '#ce93d8',
                blinkSpeed: 600
            }
        };
        
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeoutId = null;
        
        this.init();
    }
    
    init() {
        // 创建容器元素
        this.container = document.createElement('div');
        this.container.id = 'typewriter-plugin-container';
        
        // 应用位置样式 - 纯文字，无背景
        this.container.style.cssText = `
            position: fixed;
            top: ${this.config.position.top};
            left: ${this.config.position.left};
            z-index: 10000;
            transform: translateZ(0);
            user-select: none;
            background: transparent !important;
        `;
        
        // 创建文本容器
        this.textContainer = document.createElement('div');
        this.textContainer.className = 'typewriter-text-container';
        this.textContainer.style.cssText = `
            position: relative;
            display: inline-block;
            min-height: 1.2em;
            line-height: 1.3;
            background: transparent;
        `;
        
        // 创建文本元素
        this.textElement = document.createElement('span');
        this.textElement.className = 'typewriter-text';
        
        // 应用渐变字体样式
        Object.assign(this.textElement.style, {
            fontSize: this.config.fontStyle.fontSize,
            fontWeight: this.config.fontStyle.fontWeight,
            background: this.config.fontStyle.background,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: this.config.fontStyle.textShadow,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            verticalAlign: 'top',
            backgroundSize: '200% 200%',
            animation: 'neon 6s infinite alternate, blink 5s infinite',
            lineHeight: '1.4'
        });
        
        // 创建光标元素
        if (this.config.cursor.enabled) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.className = 'typewriter-cursor';
            this.cursorElement.textContent = this.config.cursor.char;
            this.cursorElement.style.cssText = `
                display: inline-block;
                margin-left: 1px;
                color: ${this.config.cursor.color};
                font-weight: bold;
                animation: cursor-blink ${this.config.cursor.blinkSpeed}ms infinite;
                opacity: 1;
                vertical-align: top;
                line-height: 1.3;
                font-size: ${this.config.fontStyle.fontSize};
            `;
        }
        
        // 组装元素
        this.textContainer.appendChild(this.textElement);
        if (this.config.cursor.enabled) {
            this.textContainer.appendChild(this.cursorElement);
        }
        
        this.container.appendChild(this.textContainer);
        
        // 添加到页面
        document.body.appendChild(this.container);
        
        // 添加动画样式
        this.addAnimations();
        
        // 开始打字效果
        this.start();
        
        console.log(' Welcome');
    }
    
    addAnimations() {
        // 确保样式只添加一次
        if (!document.querySelector('#typewriter-animations')) {
            const style = document.createElement('style');
            style.id = 'typewriter-animations';
            style.textContent = `
                @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @keyframes neon {
                    0% {
                        background-position: 0% 50%;
                        filter: hue-rotate(0deg);
                    }
                    50% {
                        background-position: 100% 50%;
                        filter: hue-rotate(180deg);
                    }
                    100% {
                        background-position: 0% 50%;
                        filter: hue-rotate(360deg);
                    }
                }               
                
                @keyframes blink {
                    0% { opacity: 1; }
                    30% { opacity: 0.4; }
                    60% { opacity: 1; }
                    80% { opacity: 0.2; }
                    100% { opacity: 1; }
                }
                
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.config.texts[this.textIndex];
        
        if (this.isDeleting) {
            // 删除字符
            this.textElement.textContent = currentText.substring(0, this.charIndex--);
        } else {
            // 打字字符 - 修复：确保最后一个字符能显示
            this.textElement.textContent = currentText.substring(0, this.charIndex);
            this.charIndex++;
        }
        
        if (!this.isDeleting && this.charIndex > currentText.length) {
            // 打字完成，开始删除
            this.isDeleting = true;
            this.timeoutId = setTimeout(() => this.type(), this.config.pauseTime);
        } else if (this.isDeleting && this.charIndex < 0) {
            // 删除完成，切换到下一段文字
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.config.texts.length;
            this.charIndex = 0;
            this.textElement.textContent = '';
            this.timeoutId = setTimeout(() => this.type(), 500);
        } else {
            // 继续打字或删除
            const speed = this.isDeleting ? this.config.deletingSpeed : this.config.typingSpeed;
            this.timeoutId = setTimeout(() => this.type(), speed);
        }
    }
    
    // 更新文本
    updateTexts(newTexts) {
        clearTimeout(this.timeoutId);
        this.config.texts = newTexts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.textElement.textContent = '';
        setTimeout(() => this.start(), 300);
    }
    
    // 更新位置
    updatePosition(top, left) {
        this.container.style.top = top;
        this.container.style.left = left;
    }
    
    // 更新字体样式
    updateFontStyle(newStyle) {
        Object.assign(this.textElement.style, newStyle);
        if (this.cursorElement) {
            this.cursorElement.style.fontSize = newStyle.fontSize || this.config.fontStyle.fontSize;
        }
    }
    
    // 暂停效果
    pause() {
        clearTimeout(this.timeoutId);
        if (this.cursorElement) {
            this.cursorElement.style.animationPlayState = 'paused';
        }
        this.textElement.style.animationPlayState = 'paused';
    }
    
    // 恢复效果
    resume() {
        if (this.cursorElement) {
            this.cursorElement.style.animationPlayState = 'running';
        }
        this.textElement.style.animationPlayState = 'running';
        this.type();
    }
    
    // 销毁插件
    destroy() {
        clearTimeout(this.timeoutId);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    window.typeWriter = new TypeWriterPlugin({
        texts: ["欢迎来到我的网站", "这里有很多有趣的内容", "尽情探索吧！"],
        position: {
            top: '30px',
            left: '20px'
        },
        fontStyle: {
            fontSize: '17px',
            fontWeight: '600',
            background: 'linear-gradient(45deg, #b3e5fc, #ce93d8, #a5d6a7, #81d4fa, #f8bbd0, #e1f5fe)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 3px currentColor'
        },
        typingSpeed: 120,
        deletingSpeed: 60,
        pauseTime: 2500,
        cursor: {
            enabled: true,
            char: '|',
            color: '#ce93d8',
            blinkSpeed: 600
        }
    });
});