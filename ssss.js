//作者deepseek🙄
// 双模式心跳系统：精确心跳 + 激进脉冲
(function(){
    console.log('💓 双模式心跳系统启动');
    
    // 配置
    const EXACT_SIZE = 250;      // 精确心跳包大小
    const EXACT_INTERVAL = 10000; // 精确心跳间隔 10秒
    const BURST_INTERVAL = 20000; // 激进脉冲间隔 20秒
    const BURST_COUNT = 3;       // 激进脉冲次数
    
    // 状态变量
    let burstCounter = 0;        // 当前激进脉冲计数
    let exactTimer = null;       // 精确心跳定时器
    let burstTimer = null;       // 激进脉冲定时器
    
    // ==================== 心跳包生成器 ====================
    // 生成精确250字节的心跳包（预计算优化版）
    const createExactHeartbeat = (function() {
        // 预计算模板
        const template = { 
            type: 'heartbeat_exact', 
            t: 0, 
            p: '' 
        };
        const baseJson = JSON.stringify(template);
        const baseSize = new Blob([baseJson.replace('0', '')]).size; // 移除时间值占位
        const neededChars = EXACT_SIZE - baseSize - 13; // 13是时间戳的预估最大长度
        
        return function() {
            const packet = { 
                type: 'heartbeat_exact', 
                t: Date.now(), 
                p: '0'.repeat(Math.max(0, neededChars)) 
            };
            return JSON.stringify(packet);
        };
    })();
    
    // 普通心跳包（小尺寸）
    function createNormalHeartbeat() {
        return JSON.stringify({ 
            type: 'heartbeat_burst',
            t: Date.now(),
            seq: burstCounter
        });
    }
    
    // ==================== 心跳发送器 ====================
    function sendHeartbeat(packet, isExact = false) {
        if (!window.ws || window.ws.readyState !== WebSocket.OPEN) {
            console.log('⚠️ 连接不可用，跳过发送');
            return false;
        }
        
        try {
            window.ws.send(packet);
            const size = new Blob([packet]).size;
            
            if (isExact) {
                console.log(`🎯 精确心跳 ${size}B (目标:${EXACT_SIZE}B) ${new Date().toLocaleTimeString()}`);
                // 验证大小（开发时启用）
                if (Math.abs(size - EXACT_SIZE) > 5) {
                    console.warn(`⚠️ 大小偏差: ${size} ≠ ${EXACT_SIZE}`);
                }
            } else {
                console.log(`💥 激进脉冲 #${burstCounter} ${size}B`);
            }
            return true;
        } catch (error) {
            console.log('❌ 发送失败:', error.message);
            return false;
        }
    }
    
    // ==================== 模式控制器 ====================
    
    // 精确心跳模式（每10秒）
    function startExactMode() {
        if (exactTimer) clearInterval(exactTimer);
        
        exactTimer = setInterval(() => {
            const packet = createExactHeartbeat();
            sendHeartbeat(packet, true);
        }, EXACT_INTERVAL);
        
        console.log(`⏱️ 精确心跳模式已启动 (每 ${EXACT_INTERVAL/1000} 秒)`);
        
        // 立即发送第一次
        setTimeout(() => sendHeartbeat(createExactHeartbeat(), true), 500);
    }
    
    // 激进脉冲模式（每20秒触发一轮，每轮连续3次）
    function startBurstMode() {
        if (burstTimer) clearInterval(burstTimer);
        
        burstTimer = setInterval(() => {
            console.log('🚀 进入激进脉冲模式');
            burstCounter = 0;
            
            // 快速连续发送3次（间隔100ms）
            const burstInterval = setInterval(() => {
                if (burstCounter >= BURST_COUNT) {
                    clearInterval(burstInterval);
                    console.log('✅ 激进脉冲完成');
                    return;
                }
                
                sendHeartbeat(createNormalHeartbeat());
                burstCounter++;
            }, 100); // 100ms间隔快速发送
        }, BURST_INTERVAL);
        
        console.log(`⚡ 激进脉冲模式已启动 (每 ${BURST_INTERVAL/1000} 秒触发3连发)`);
        
        // 20秒后开始第一次脉冲
        setTimeout(() => {
            console.log('🚀 首次激进脉冲即将开始...');
        }, BURST_INTERVAL - 500);
    }
    
    // ==================== 系统控制 ====================
    function startAll() {
        console.log('🚀 启动所有心跳模式');
        startExactMode();
        startBurstMode();
    }
    
    function stopAll() {
        if (exactTimer) clearInterval(exactTimer);
        if (burstTimer) clearInterval(burstTimer);
        exactTimer = null;
        burstTimer = null;
        console.log('⏹️ 所有心跳已停止');
    }
    
    // ==================== 公开接口 ====================
    window.HeartbeatSystem = {
        start: startAll,
        stop: stopAll,
        sendExact: () => sendHeartbeat(createExactHeartbeat(), true),
        triggerBurst: () => {
            burstCounter = 0;
            console.log('🔫 手动触发激进脉冲');
            for (let i = 0; i < BURST_COUNT; i++) {
                setTimeout(() => {
                    sendHeartbeat(createNormalHeartbeat());
                }, i * 100);
            }
        },
        getStatus: () => ({
            exactInterval: EXACT_INTERVAL,
            burstInterval: BURST_INTERVAL,
            burstCount: BURST_COUNT,
            exactSize: EXACT_SIZE,
            isRunning: !!(exactTimer || burstTimer)
        })
    };
    
    // 自动启动
    startAll();
    
})();