/**
 * AutoNotice - 公告弹窗
 * 版本：2.3 (节日版)
 */
//Copyright (2745994601@qq.com). Do not remove this comment if you want to use it. If piracy and embezzlement are found, they will be investigated for legal responsibility.
// Copyright (2745994601@qq.com). 
// 如需使用本代码，请勿删除此版权声明。若发现盗用或挪用行为，将依法追究法律责任。
(function() {
    'use strict';
    
    // 配置 - 保持原尺寸不变
    const CONFIG = {
        enabled: true,                   // 总开关
        delay: 13000,                     // 延迟显示9秒
        duration: 78000,                  // 显示时长78秒
        checkInterval: 60000000,            // 检查内容更新间隔∞
        size: { width: 300, height: 250 }, // 弹窗尺寸保持300×250px
        zIndex: 99999,                   // 层级
        contentUrl: '/fileapi/playing/.v3/a.html', // 内容地址
        
        // 日间模式时间范围
        dayStart: 6,     // 早上6点
        dayEnd: 18,      // 晚上6点
        
        // 样式
        styles: {
            day: {
                bg: '#ffffff',
                text: '#1a1a1a',
                border: '#e0e0e0',
                button: '#0052cc'
            },
            night: {
                bg: '#1a1f2e',
                text: '#ffffff',
                border: '#2d3748',
                button: '#4dabf7'
            }
        }
    };
    
    // 超全节日列表（50+个节日，包含各种小节日）
    const FESTIVALS = [
        // 1月
        { date: '01-01', name: '元旦', emoji: '🎉' },
        { date: '01-05', name: '小寒', emoji: '❄️' },
        { date: '01-10', name: '警察节', emoji: '👮' },
        { date: '01-20', name: '大寒', emoji: '🥶' },
        
        // 2月
        { date: '02-02', name: '世界湿地日', emoji: '🌿' },
        { date: '02-04', name: '立春', emoji: '🌱' },
        { date: '02-10', name: '春节', emoji: '🧧' },
        { date: '02-14', name: '情人节', emoji: '❤️' },
        { date: '02-19', name: '雨水', emoji: '💧' },
        { date: '02-24', name: '元宵节', emoji: '🏮' },
        
        // 3月
        { date: '03-01', name: '国际海豹日', emoji: '🦭' },
        { date: '03-03', name: '全国爱耳日', emoji: '👂' },
        { date: '03-05', name: '惊蛰', emoji: '🐛' },
        { date: '03-08', name: '妇女节', emoji: '👩' },
        { date: '03-12', name: '植树节', emoji: '🌳' },
        { date: '03-14', name: '白色情人节', emoji: '💝' },
        { date: '03-15', name: '消费者权益日', emoji: '🛒' },
        { date: '03-20', name: '春分', emoji: '🌼' },
        { date: '03-21', name: '世界睡眠日', emoji: '😴' },
        { date: '03-22', name: '世界水日', emoji: '💦' },
        
        // 4月
        { date: '04-01', name: '愚人节', emoji: '🤪' },
        { date: '04-04', name: '清明节', emoji: '🕯️' },
        { date: '04-05', name: '清明', emoji: '🌿' },
        { date: '04-07', name: '世界卫生日', emoji: '⚕️' },
        { date: '04-22', name: '世界地球日', emoji: '🌍' },
        { date: '04-23', name: '读书日', emoji: '📚' },
        
        // 5月
        { date: '05-01', name: '劳动节', emoji: '🛠️' },
        { date: '05-04', name: '青年节', emoji: '🎓' },
        { date: '05-05', name: '立夏', emoji: '☀️' },
        { date: '05-08', name: '世界微笑日', emoji: '😊' },
        { date: '05-12', name: '护士节', emoji: '👩‍⚕️' },
        { date: '05-20', name: '小满', emoji: '🌾' },
        { date: '05-21', name: '520', emoji: '💕' },
        
        // 6月
        { date: '06-01', name: '儿童节', emoji: '🧒' },
        { date: '06-05', name: '芒种', emoji: '🌾' },
        { date: '06-06', name: '全国爱眼日', emoji: '👁️' },
        { date: '06-10', name: '端午节', emoji: '🎏' },
        { date: '06-18', name: '父亲节', emoji: '👨' },
        { date: '06-21', name: '夏至', emoji: '🔥' },
        
        // 7月
        { date: '07-01', name: '建党节', emoji: '🇨🇳' },
        { date: '07-07', name: '小暑', emoji: '🌡️' },
        { date: '07-23', name: '大暑', emoji: '🥵' },
        
        // 8月
        { date: '08-01', name: '建军节', emoji: '🎖️' },
        { date: '08-07', name: '立秋', emoji: '🍂' },
        { date: '08-22', name: '处暑', emoji: '🍁' },
        { date: '08-25', name: '七夕节', emoji: '💑' },
        
        // 9月
        { date: '09-03', name: '抗战胜利日', emoji: '✌️' },
        { date: '09-07', name: '白露', emoji: '💧' },
        { date: '09-10', name: '教师节', emoji: '👨‍🏫' },
        { date: '09-17', name: '中秋节', emoji: '🥮' },
        { date: '09-23', name: '秋分', emoji: '🍂' },
        
        // 10月
        { date: '10-01', name: '国庆节', emoji: '🎊' },
        { date: '10-08', name: '寒露', emoji: '🍁' },
        { date: '10-23', name: '霜降', emoji: '❄️' },
        { date: '10-31', name: '万圣夜', emoji: '🎃' },
        
        // 11月
        { date: '11-07', name: '立冬', emoji: '⛄' },
        { date: '11-11', name: '光棍节', emoji: '🥢' },
        { date: '11-22', name: '小雪', emoji: '🌨️' },
        { date: '11-25', name: '感恩节', emoji: '🦃' },
        
        // 12月
        { date: '12-07', name: '大雪', emoji: '❄️' },
        { date: '12-21', name: '冬至', emoji: '🥟' },
        { date: '12-24', name: '平安夜', emoji: '🎄' },
        { date: '12-25', name: '圣诞节', emoji: '🎅' },
        { date: '12-31', name: '跨年夜', emoji: '🎆' }
    ];
    
    // 状态管理
    let notice = null;
    let timer = null;
    let hideTimer = null;
    let checkTimer = null;
    let contentCache = '';
    let isVisible = false;
    let currentMode = 'day';
    let isHiding = false;
    
    // 工具函数
    const utils = {
        // 获取北京时间
        getBeijingTime() {
            const now = new Date();
            const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
            
            const year = beijingTime.getUTCFullYear();
            const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
            const date = String(beijingTime.getUTCDate()).padStart(2, '0');
            const hours = String(beijingTime.getUTCHours()).padStart(2, '0');
            const minutes = String(beijingTime.getUTCMinutes()).padStart(2, '0');
            const seconds = String(beijingTime.getUTCSeconds()).padStart(2, '0');
            
            const hour = parseInt(hours);
            let period = '凌晨';
            if (hour >= 5 && hour < 8) period = '清晨';
            else if (hour >= 8 && hour < 11) period = '上午';
            else if (hour >= 11 && hour < 13) period = '中午';
            else if (hour >= 13 && hour < 17) period = '下午';
            else if (hour >= 17 && hour < 20) period = '傍晚';
            else if (hour >= 20 && hour < 24) period = '晚上';
            else if (hour >= 0 && hour < 5) period = '深夜';
            
            let weatherIcon = '🌙';
            if (hour >= 6 && hour < 18) weatherIcon = '☀️';
            if (hour >= 6 && hour < 9) weatherIcon = '🌤️';
            if (hour >= 17 && hour < 19) weatherIcon = '🌇';
            
            return {
                datetime: `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${period}`,
                date: `${year}-${month}-${date}`,
                time: `${hours}:${minutes}:${seconds}`,
                period,
                weatherIcon,
                hour
            };
        },
        
        getTimeMode(hour) {
            return (hour >= CONFIG.dayStart && hour < CONFIG.dayEnd) ? 'day' : 'night';
        },
        
        // 获取节日信息
        getFestivalInfo() {
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentDay = now.getDate();
            const currentYear = now.getFullYear();
            
            // 检查今天是否是节日
            const todayStr = `${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
            const todayFestival = FESTIVALS.find(f => f.date === todayStr);
            if (todayFestival) {
                return { 
                    festival: todayFestival.name, 
                    emoji: todayFestival.emoji,
                    daysDiff: 0 
                };
            }
            
            // 寻找下一个节日（30天内）
            let nextFestival = null;
            let minDiff = Infinity;
            
            for (const festival of FESTIVALS) {
                const [festMonth, festDay] = festival.date.split('-').map(Number);
                let festDate = new Date(currentYear, festMonth - 1, festDay);
                
                // 如果今年节日已过，看明年
                if (festDate < now) {
                    festDate = new Date(currentYear + 1, festMonth - 1, festDay);
                }
                
                const diffTime = festDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays > 0 && diffDays < minDiff && diffDays <= 30) {
                    minDiff = diffDays;
                    nextFestival = festival;
                }
            }
            
            if (nextFestival) {
                return { 
                    festival: nextFestival.name, 
                    emoji: nextFestival.emoji,
                    daysDiff: minDiff 
                };
            }
            
            return null;
        },
        
        // 获取节日显示文本
        getFestivalText() {
            const festivalInfo = this.getFestivalInfo();
            if (!festivalInfo) return '';
            
            if (festivalInfo.daysDiff === 0) {
                return `${festivalInfo.emoji} ${festivalInfo.festival}`;
            } else {
                return `距${festivalInfo.festival}${festivalInfo.daysDiff}天`;
            }
        }
    };
    
    // DOM操作
    const dom = {
        createStyles() {
            const style = document.createElement('style');
            style.id = 'auto-notice-styles';
            style.textContent = `
                .auto-notice {
                    position: fixed;
                    top: 15px;
                    right: -300px;
                    width: ${CONFIG.size.width}px;
                    height: ${CONFIG.size.height}px;
                    z-index: ${CONFIG.zIndex};
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateX(0);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    flex-direction: column;
                }
                
                .auto-notice.show {
                    transform: translateX(-315px);
                }
                
                .auto-notice.hiding {
                    transform: translateX(0);
                }
                
                .auto-notice.day-mode {
                    background: ${CONFIG.styles.day.bg};
                    color: ${CONFIG.styles.day.text};
                    border: 1px solid ${CONFIG.styles.day.border};
                }
                
                .auto-notice.night-mode {
                    background: ${CONFIG.styles.night.bg};
                    color: ${CONFIG.styles.night.text};
                    border: 1px solid ${CONFIG.styles.night.border};
                }
                
                .notice-header {
                    padding: 8px 10px;
                    border-bottom: 1px solid;
                    font-size: 10.8px; /* 原来12px，缩小1/5后为10.8px */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-shrink: 0;
                    min-height: 28px;
                }
                
                .day-mode .notice-header {
                    border-color: ${CONFIG.styles.day.border};
                    background: ${CONFIG.styles.day.bg};
                }
                
                .night-mode .notice-header {
                    border-color: ${CONFIG.styles.night.border};
                    background: ${CONFIG.styles.night.bg};
                }
                
                .time-display {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-weight: 500;
                    flex-wrap: wrap;
                    width: 100%;
                }
                
                .time-icon {
                    font-size: 11px; /* 相应缩小 */
                }
                
                .time-text {
                    font-size: 10.8px; /* 缩小1/5 */
                    font-weight: 500;
                }
                
                .festival-info {
                    font-size: 10.8px; /* 缩小1/5 */
                    color: #0052cc; /* 蓝色 */
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex-shrink: 0;
                    margin-left: auto;
                }
                
                .night-mode .festival-info {
                    color: #4dabf7; /* 夜间模式用亮蓝色 */
                }
                
                .notice-content {
                    flex: 1;
                    padding: 12px;
                    overflow-y: auto;
                    font-size: 13px;
                    line-height: 1.5;
                    max-height: ${CONFIG.size.height - 90}px;
                }
                
                .notice-content * {
                    max-width: 100%;
                    margin: 0;
                    padding: 0;
                    font-size: 13px;
                }
                
                .notice-content img {
                    max-width: 100%;
                    height: auto;
                }
                
                .notice-footer {
                    padding: 8px 12px;
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                    border-top: 1px solid;
                    flex-shrink: 0;
                }
                
                .day-mode .notice-footer {
                    border-color: ${CONFIG.styles.day.border};
                    background: ${CONFIG.styles.day.bg};
                }
                
                .night-mode .notice-footer {
                    border-color: ${CONFIG.styles.night.border};
                    background: ${CONFIG.styles.night.bg};
                }
                
                .notice-btn {
                    padding: 6px 16px;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: white;
                    min-width: 90px;
                }
                
                .day-mode .notice-btn {
                    background: ${CONFIG.styles.day.button};
                }
                
                .night-mode .notice-btn {
                    background: ${CONFIG.styles.night.button};
                }
                
                .notice-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                
                .notice-btn:active {
                    transform: translateY(0);
                }
                
                .btn-close {
                    background: #666 !important;
                }
                
                @media (max-width: 320px) {
                    .auto-notice {
                        width: 260px;
                        height: 156px;
                    }
                    
                    .auto-notice.show {
                        transform: translateX(-275px);
                    }
                    
                    .notice-header {
                        font-size: 9.6px;
                    }
                    
                    .festival-info {
                        font-size: 9.6px;
                    }
                }
            `;
            document.head.appendChild(style);
        },
        
        createNotice() {
            const timeInfo = utils.getBeijingTime();
            currentMode = utils.getTimeMode(timeInfo.hour);
            const festivalText = utils.getFestivalText();
            
            const noticeEl = document.createElement('div');
            noticeEl.className = `auto-notice ${currentMode}-mode`;
            noticeEl.innerHTML = `
                <div class="notice-header">
                    <div class="time-display">
                        <span class="time-icon">${timeInfo.weatherIcon}</span>
                        <span class="time-text">${timeInfo.date} ${timeInfo.time} ${timeInfo.period}</span>
                        ${festivalText ? `<span class="festival-info">${festivalText}</span>` : ''}
                    </div>
                </div>
                <div class="notice-content" id="noticeContent">
                    <div class="loading">加载中...</div>
                </div>
                <div class="notice-footer">
                    <button class="notice-btn btn-close">我知道啦</button>
                    <button class="notice-btn btn-hide">6小时内不再显示</button>
                </div>
            `;
            
            document.body.appendChild(noticeEl);
            return noticeEl;
        },
        
        updateTime() {
            if (!notice) return;
            
            const timeInfo = utils.getBeijingTime();
            const timeDisplay = notice.querySelector('.time-display');
            const festivalText = utils.getFestivalText();
            
            if (timeDisplay) {
                timeDisplay.innerHTML = `
                    <span class="time-icon">${timeInfo.weatherIcon}</span>
                    <span class="time-text">${timeInfo.date} ${timeInfo.time} ${timeInfo.period}</span>
                    ${festivalText ? `<span class="festival-info">${festivalText}</span>` : ''}
                `;
            }
            
            const newMode = utils.getTimeMode(timeInfo.hour);
            if (newMode !== currentMode) {
                notice.classList.remove(`${currentMode}-mode`);
                notice.classList.add(`${newMode}-mode`);
                currentMode = newMode;
            }
        },
        
        updateContent(content) {
            if (!notice || !content) return;
            
            const contentEl = notice.querySelector('.notice-content');
            if (contentEl) {
                contentEl.innerHTML = content;
                contentCache = content;
            }
        }
    };
    
    // 网络请求
    const network = {
        async fetchContent() {
            try {
                const response = await fetch(CONFIG.contentUrl + '?t=' + Date.now());
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const html = await response.text();
                return html.trim();
            } catch (error) {
                console.error('加载失败:', error);
                return '<div style="padding: 10px; color: #666; text-align: center;">内容加载失败</div>';
            }
        },
        
        async checkForUpdate() {
            const newContent = await this.fetchContent();
            if (newContent && newContent !== contentCache) {
                dom.updateContent(newContent);
                if (isVisible) {
                    dom.updateContent(newContent);
                }
            }
        }
    };
    
    // 主要功能
    const main = {
        init() {
            if (!CONFIG.enabled) return;
            
            const hiddenUntil = localStorage.getItem('auto_notice_hidden');
            if (hiddenUntil) {
                const hideTime = parseInt(hiddenUntil, 10);
                if (Date.now() < hideTime) {
                    return;
                } else {
                    localStorage.removeItem('auto_notice_hidden');
                }
            }
            
            dom.createStyles();
            
            timer = setTimeout(() => {
                this.showNotice();
            }, CONFIG.delay);
            
            checkTimer = setInterval(() => {
                network.checkForUpdate();
            }, CONFIG.checkInterval);
            
            setTimeout(() => {
                network.checkForUpdate();
            }, 1000);
        },
        
        async showNotice() {
            if (isVisible || isHiding) return;
            
            notice = dom.createNotice();
            isHiding = false;
            
            try {
                const content = await network.fetchContent();
                dom.updateContent(content);
            } catch (error) {
                console.error('内容加载失败:', error);
            }
            
            this.bindEvents();
            
            requestAnimationFrame(() => {
                if (!notice) return;
                
                setTimeout(() => {
                    if (!notice) return;
                    
                    notice.classList.add('show');
                    isVisible = true;
                    
                    if (CONFIG.duration > 0) {
                        hideTimer = setTimeout(() => {
                            this.hideNotice();
                        }, CONFIG.duration);
                    }
                }, 50);
            });
            
            // 每秒更新时间（实时走动）
            const timeInterval = setInterval(() => {
                if (!notice || !isVisible) {
                    clearInterval(timeInterval);
                    return;
                }
                dom.updateTime();
            }, 1000);
        },
        
        bindEvents() {
            if (!notice) return;
            
            const closeBtn = notice.querySelector('.btn-close');
            closeBtn.addEventListener('click', () => {
                this.hideNotice();
            });
            
            const hideBtn = notice.querySelector('.btn-hide');
            hideBtn.addEventListener('click', () => {
                const hideUntil = Date.now() + (6 * 60 * 60 * 1000);
                localStorage.setItem('auto_notice_hidden', hideUntil.toString());
                this.hideNotice();
            });
            
            notice.addEventListener('mouseenter', () => {
                clearTimeout(hideTimer);
            });
            
            notice.addEventListener('mouseleave', () => {
                if (isVisible && CONFIG.duration > 0) {
                    hideTimer = setTimeout(() => {
                        this.hideNotice();
                    }, CONFIG.duration);
                }
            });
        },
        
        hideNotice() {
            if (!notice || isHiding || !isVisible) return;
            
            isHiding = true;
            isVisible = false;
            
            clearTimeout(hideTimer);
            
            notice.classList.remove('show');
            notice.classList.add('hiding');
            
            setTimeout(() => {
                if (notice && notice.parentNode) {
                    notice.parentNode.removeChild(notice);
                }
                notice = null;
                isHiding = false;
            }, 400);
        },
        
        destroy() {
            clearTimeout(timer);
            clearTimeout(hideTimer);
            clearInterval(checkTimer);
            
            this.hideNotice();
            
            const styles = document.getElementById('auto-notice-styles');
            if (styles) styles.remove();
        }
    };
    
    // 公开API
    window.AutoNotice = {
        config(options) {
            Object.assign(CONFIG, options);
            if (!CONFIG.enabled) {
                this.destroy();
            }
        },
        
        show() {
            if (!isVisible) {
                main.showNotice();
            }
        },
        
        hide() {
            main.hideNotice();
        },
        
        async refresh() {
            const content = await network.fetchContent();
            dom.updateContent(content);
        },
        
        getFestivalInfo() {
            return utils.getFestivalInfo();
        },
        
        getStatus() {
            const festivalInfo = utils.getFestivalInfo();
            return {
                enabled: CONFIG.enabled,
                visible: isVisible,
                hiding: isHiding,
                mode: currentMode,
                contentUrl: CONFIG.contentUrl,
                delay: CONFIG.delay,
                duration: CONFIG.duration,
                size: CONFIG.size,
                isHidden: localStorage.getItem('auto_notice_hidden') ? '是' : '否',
                festival: festivalInfo ? `${festivalInfo.emoji} ${festivalInfo.festival}` : '无',
                festivalDays: festivalInfo ? festivalInfo.daysDiff : null
            };
        },
        
        hideFor(hours) {
            const ms = (hours || 6) * 60 * 60 * 1000;
            localStorage.setItem('auto_notice_hidden', (Date.now() + ms).toString());
            main.hideNotice();
        },
        
        reset() {
            localStorage.removeItem('auto_notice_hidden');
        },
        
        destroy() {
            main.destroy();
        }
    };
    
    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => main.init());
    } else {
        main.init();
    }
    
})();