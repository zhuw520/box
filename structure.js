// HTML动态注入脚本 - 自动生成
// 保存为.js文件并在body中引用即可

(function() {
    'use strict';

    const HTML_CONTENT = `<!-- 用户协议弹窗（MD3风格） -->
    <div id="userAgreementModal" class="modal" style="display: flex; z-index: 10000;">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-balance-scale"></i> 用户协议与责任声明</h3>
            </div>
            <div class="modal-body">
                <div class="user-agreement-content">
                    <p style="font-weight: 500; margin-bottom: 20px;">用户需知并同意以下条款：</p>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>本平台为技术服务平台，仅提供匿名通信技术支持</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>未经授权禁止任何形式的获取、使用、修改、分发、商业利用本页面代码及相关资源，违者将承担法律责任。</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>用户应对自身发布的全部内容承担独立法律责任</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>如用户发布违法信息，产生的一切法律后果由用户自行承担</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>严禁对本平台进行任何形式的网络攻击、漏洞扫描或DDoS攻击</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>禁止尝试破坏服务稳定性、篡改数据或进行未授权访问</div>
                    </div>
                    
                    <div class="agreement-item">
                        <div class="agreement-item-icon">🔸</div>
                        <div>不得利用平台进行任何违法或侵犯他人权益的活动</div>
                    </div>
                    
                    <div class="agreement-notice">
                        <p style="margin: 0; font-weight: 500;">我已阅读并同意以上用户协议与责任声明</p>
                    </div>
                    
                    <div style="text-align: center; color: var(--md-sys-color-on-surface-variant); font-size: 13px; margin: 20px 0;">
                        请仔细阅读并同意以上条款后方可使用本服务<br>
                        不同意将无法合法使用此服务
                    </div>

                    <!-- 公告区域 -->
                    <div class="announcement-section">
                        <div class="announcement-title">
                            <i class="fas fa-bullhorn"></i> 最新公告
                        </div>
                        <div id="announcementContent" style="font-size: 13px; color: var(--md-sys-color-on-surface); line-height: 1.5; min-height: 40px; white-space: pre-line;">
                            正在加载公告内容...
                        </div>
                        <div class="announcement-time">
                            公告更新时间: <span id="announcementTime">--</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="md3-filled-tonal-btn" onclick="if(confirm('您必须同意用户协议才能使用本聊天服务。\\\n\\\n点击\\"确定\\"关闭页面，点击\\"取消\\"继续阅读协议。')){window.close();}" style="padding: 10px 20px;">
                    不同意🥺
                </button>
                <button class="md3-filled-btn" onclick="document.getElementById('userAgreementModal').style.display = 'none'" style="padding: 10px 20px;">
                    同意并继续
                </button>
            </div>
        </div>
    </div>

    <!-- 默认背景水印 -->
    <div style="position: fixed; top: 80px; left: 15px; z-index: 9999; font-family: 'Microsoft YaHei', sans-serif; pointer-events: auto;">
        <div style="font-size: 14px; color: rgba(103, 80, 164, 0.7); margin-bottom: 5px;">作者ZHU.QQ274*↙.随便做的😍</div>
        <a href="https://qm.qq.com/q/pey4opIljy" 
           target="_blank" 
           style="font-size: 12px; color: rgba(255, 138, 170, 0.8); text-decoration: underline; cursor: pointer;">
           点击前往
        </a>
    </div>

    <!-- 头部 -->
    <div class="header">
        <div class="header-left">
            <!-- 扩展功能菜单按钮 -->
            <button class="ext-menu-btn" id="extMenuBtn" onclick="toggleExtSidebar()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="3" y="11.25" width="18" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="3" y="16.5" width="18" height="1.5" rx="0.75" fill="currentColor"/>
                </svg>
            </button>
        </div>
        <div class="header-center">
            <h1><i class="fas fa-comments"></i> 高性能聊天室 Go WebSocket</h1>
            <div class="online-count">在线: <span id="onlineCount">1</span>人 | 内存: <span id="memoryCount">0</span>/400条</div>
        </div>
        <div class="header-right">
   
        </div>
    </div>

    <!-- 扩展功能侧边栏 -->
    <div class="ext-sidebar-overlay" id="extSidebarOverlay" onclick="closeExtSidebar()"></div>
    <div class="ext-sidebar" id="extSidebar">
        <div class="sidebar-header">
            <h2><i class="fas fa-sliders-h"></i> 扩展功能</h2>
            <button class="sidebar-close-btn" onclick="closeExtSidebar()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="sidebar-content">
            <!-- 消息过滤 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-filter"></i> 消息过滤</h3>
                <div class="filter-grid">
                    <div class="filter-item" onclick="toggleCheckbox('hideSystemMsg')">
                        <label>
                            <span class="filter-text">隐藏系统消息</span>
                        </label>
                        <div class="md3-switch">
                            <input type="checkbox" id="hideSystemMsg" onchange="updateMessageFilter()">
                            <span class="md3-switch-track">
                                <span class="md3-switch-thumb"></span>
                            </span>
                        </div>
                    </div>
                    
                    <div class="filter-item" onclick="toggleCheckbox('hideUserMsg')">
                        <label>
                            <span class="filter-text">隐藏用户消息</span>
                        </label>
                        <div class="md3-switch">
                            <input type="checkbox" id="hideUserMsg" onchange="updateMessageFilter()">
                            <span class="md3-switch-track">
                                <span class="md3-switch-thumb"></span>
                            </span>
                        </div>
                    </div>
                    
                    <div class="filter-item" onclick="toggleCheckbox('hideAIMsg')">
                        <label>
                            <span class="filter-text">隐藏AI消息</span>
                        </label>
                        <div class="md3-switch">
                            <input type="checkbox" id="hideAIMsg" onchange="updateMessageFilter()">
                            <span class="md3-switch-track">
                                <span class="md3-switch-thumb"></span>
                            </span>
                        </div>
                    </div>
                    
                    <div class="filter-item" onclick="toggleCheckbox('hideFileMsg')">
                        <label>
                            <span class="filter-text">隐藏文件消息</span>
                        </label>
                        <div class="md3-switch">
                            <input type="checkbox" id="hideFileMsg" onchange="updateMessageFilter()">
                            <span class="md3-switch-track">
                                <span class="md3-switch-thumb"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 关键词屏蔽 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-ban"></i> 关键词屏蔽</h3>
                <div class="keyword-input-group">
                    <input type="text" class="keyword-input" id="keywordInput" placeholder="输入屏蔽词，逗号分隔">
                    <button class="md3-filled-tonal-btn" onclick="addKeyword()">添加</button>
                </div>
                <div class="keywords-list" id="keywordsList">
                    <!-- 关键词动态添加 -->
                </div>
            </div>

            <!-- 新消息自动滚动 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-arrows-alt-v"></i> 新消息自动滚动</h3>
                <div class="auto-scroll-options">
                    <div class="auto-scroll-option active" onclick="changeAutoScroll('smart')">
                        <div class="auto-scroll-icon">🤖</div>
                        <span class="auto-scroll-label">智能</span>
                    </div>
                    
                    <div class="auto-scroll-option" onclick="changeAutoScroll('always')">
                        <div class="auto-scroll-icon">🔽</div>
                        <span class="auto-scroll-label">打开</span>
                    </div>
                    
                    <div class="auto-scroll-option" onclick="changeAutoScroll('never')">
                        <div class="auto-scroll-icon">🚫</div>
                        <span class="auto-scroll-label">关闭</span>
                    </div>
                </div>
            </div>

            <!-- 消息密度 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-text-height"></i> 消息密度</h3>
                <div class="density-options">
                    <div class="density-option" onclick="changeMessageDensity('compact')">
                        <div class="density-preview compact">
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                        </div>
                        <span class="density-label">紧凑</span>
                    </div>
                    
                    <div class="density-option active" onclick="changeMessageDensity('comfortable')">
                        <div class="density-preview comfortable">
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                        </div>
                        <span class="density-label">舒适</span>
                    </div>
                    
                    <div class="density-option" onclick="changeMessageDensity('relaxed')">
                        <div class="density-preview relaxed">
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                            <div class="density-line"></div>
                        </div>
                        <span class="density-label">宽松</span>
                    </div>
                </div>
            </div>

            <!-- 主题颜色 -->
<div class="sidebar-section">
    <h3><i class="fas fa-palette"></i> 主题颜色</h3>
    <div class="theme-colors">
        <button class="theme-color-btn active" data-theme="purple" onclick="changeTheme('purple')">
            <div class="theme-color-sample" style="background: #6750A4;"></div>
            <span class="theme-label">紫色</span>
        </button>
        <button class="theme-color-btn" data-theme="blue" onclick="changeTheme('blue')">
            <div class="theme-color-sample" style="background: #1E88E5;"></div>
            <span class="theme-label">蓝色</span>
        </button>
        <button class="theme-color-btn" data-theme="green" onclick="changeTheme('green')">
            <div class="theme-color-sample" style="background: #43A047;"></div>
            <span class="theme-label">绿色</span>
        </button>
        <button class="theme-color-btn" data-theme="orange" onclick="changeTheme('orange')">
            <div class="theme-color-sample" style="background: #FB8C00;"></div>
            <span class="theme-label">橙色</span>
        </button>
        <button class="theme-color-btn" data-theme="pink" onclick="changeTheme('pink')">
            <div class="theme-color-sample" style="background: #FFB6C1;"></div>
            <span class="theme-label">樱花粉</span>
        </button>
    </div>
</div>

            <!-- 气泡颜色 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-comment-dots"></i> 气泡颜色</h3>
                <div class="bubble-colors">
                    <button class="bubble-color-option active" data-color="default" onclick="changeBubbleColor('default')">
                        <div class="bubble-color-preview" style="background: var(--bubble-default);"></div>
                        <span class="theme-label">默认</span>
                    </button>
                    <button class="bubble-color-option" data-color="lightblue" onclick="changeBubbleColor('lightblue')">
                        <div class="bubble-color-preview" style="background: var(--bubble-lightblue);"></div>
                        <span class="theme-label">淡蓝</span>
                    </button>
                    <button class="bubble-color-option" data-color="lightcyan" onclick="changeBubbleColor('lightcyan')">
                        <div class="bubble-color-preview" style="background: var(--bubble-lightcyan);"></div>
                        <span class="theme-label">淡青</span>
                    </button>
                    <button class="bubble-color-option" data-color="lightyellow" onclick="changeBubbleColor('lightyellow')">
                        <div class="bubble-color-preview" style="background: var(--bubble-lightyellow);"></div>
                        <span class="theme-label">淡黄</span>
                    </button>
                    <button class="bubble-color-option" data-color="lightpink" onclick="changeBubbleColor('lightpink')">
                        <div class="bubble-color-preview" style="background: var(--bubble-lightpink);"></div>
                        <span class="theme-label">淡粉</span>
                    </button>
                </div>
            </div>

            <!-- 头像颜色 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-user-circle"></i> 头像颜色</h3>
                <div class="avatar-colors">
                    <button class="avatar-color-option active" data-color="purple" onclick="changeAvatarColor('purple')">
                        <div class="avatar-color-preview" style="background: var(--avatar-purple);">用户</div>
                        <span class="theme-label">紫色</span>
                    </button>
                    <button class="avatar-color-option" data-color="blue" onclick="changeAvatarColor('blue')">
                        <div class="avatar-color-preview" style="background: var(--avatar-blue);">用户</div>
                        <span class="theme-label">蓝色</span>
                    </button>
                    <button class="avatar-color-option" data-color="green" onclick="changeAvatarColor('green')">
                        <div class="avatar-color-preview" style="background: var(--avatar-green);">用户</div>
                        <span class="theme-label">绿色</span>
                    </button>
                    <button class="avatar-color-option" data-color="orange" onclick="changeAvatarColor('orange')">
                        <div class="avatar-color-preview" style="background: var(--avatar-orange);">用户</div>
                        <span class="theme-label">橙色</span>
                    </button>
                    <button class="avatar-color-option" data-color="teal" onclick="changeAvatarColor('teal')">
                        <div class="avatar-color-preview" style="background: var(--avatar-teal);">用户</div>
                        <span class="theme-label">青色</span>
                    </button>
                </div>
            </div>

            <!-- 动画效果 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-film"></i> 动画效果</h3>
                <div class="animation-options">
                    <div class="animation-option active" onclick="toggleAnimation('Message')">
                        <div class="animation-icon">📨</div>
                        <span class="animation-label">消息动画</span>
                    </div>
                    <div class="animation-option active" onclick="toggleAnimation('Typing')">
                        <div class="animation-icon">⌨️</div>
                        <span class="animation-label">打字动画</span>
                    </div>
                </div>
            </div>

           <!-- 夜间模式 -->
<div class="sidebar-section">
    <h3><i class="fas fa-moon"></i> 夜间模式</h3>
    <div class="night-mode-item" onclick="toggleNightMode()" style="cursor: pointer;">
        <span class="filter-text">启用夜间模式</span>
        <div class="md3-switch">
            <input type="checkbox" id="nightMode">
            <span class="md3-switch-track">
                <span class="md3-switch-thumb"></span>
            </span>
        </div>
    </div>
</div>
            <!-- 音乐悬浮窗开关 -->
<div class="sidebar-section">
    <h3><i class="fas fa-music"></i> 音乐悬浮窗</h3>
    <div class="night-mode-item" onclick="toggleMusicWidget()" style="cursor: pointer;">
        <span class="filter-text">显示音乐悬浮窗</span>
        <div class="md3-switch">
            <input type="checkbox" id="showMusicWidget" checked>
            <span class="md3-switch-track">
                <span class="md3-switch-thumb"></span>
            </span>
        </div>
    </div>
</div>
            <!-- 说明按钮 -->
<div class="sidebar-section">
    <h3><i class="fas fa-info-circle"></i> 使用说明</h3>
    <div class="night-mode-item" onclick="document.getElementById('instructionsModal').style.display = 'flex'; closeExtSidebar();" style="cursor: pointer;">
        <span class="filter-text">查看使用说明</span>
        <div class="md3-switch">
            <!-- 这里放一个只读的开关 -->
            <input type="checkbox" disabled style="opacity: 0.5;">
            <span class="md3-switch-track">
                <span class="md3-switch-thumb"></span>
            </span>
        </div>
    </div>
</div>
            <!-- 自动清理 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-broom"></i> 自动清理</h3>
                <div class="auto-clean-control">
                    <span style="font-size: 14px; color: var(--md-sys-color-on-surface);">保留最近</span>
                    <input type="number" class="auto-clean-input" id="autoCleanCount" value="100" min="10" max="1000" onchange="updateAutoClean()">
                    <span style="font-size: 14px; color: var(--md-sys-color-on-surface);">条消息</span>
                </div>
            </div>

            <!-- 聊天统计 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-chart-bar"></i> 聊天统计</h3>
                <div class="message-stats">
                    <div class="stat-item">
                        <div class="stat-value" id="statToday">0</div>
                        <div class="stat-label">今日消息</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="statTotal">0</div>
                        <div class="stat-label">总消息数</div>
                    </div>
                </div>
            </div>

            <!-- 功能按钮 -->
            <div class="sidebar-section">
                <h3><i class="fas fa-tools"></i> 功能操作</h3>
                <div class="function-buttons">
                      <!-- 在这里添加搜索按钮 -->
        <button class="function-btn" onclick="openSearchModal()">
            <i class="fas fa-search"></i> 消息搜索
        </button>
                    <button class="function-btn" onclick="openUploadModal()">
                        <i class="fas fa-file-upload"></i> 上传文件
                    </button>
                    <button class="function-btn" onclick="openVoiceModal()">
                       <i class="fas fa-microphone-alt"></i> 发送语音消息
                    </button>
                    <button class="function-btn" onclick="openBackgroundModal()">
                        <i class="fas fa-image"></i> 聊天背景
                    </button>
                    <button class="function-btn" onclick="openCollectMessagesModal()">
                        <i class="fas fa-star"></i> 收藏消息
                    </button>
                    <button class="function-btn" onclick="showFavoritesModal()">
                        <i class="fas fa-star"></i> 查看收藏
                    </button>
                    <button class="function-btn" onclick="exportChatHistory()">
                        <i class="fas fa-download"></i> 导出聊天
                    </button>
<!--═════════════════════════════-->                    
                    <!-- 在 function-buttons 里添加 -->
                    <button class="function-btn" onclick="openPHPServicesModal()">
                        <i class="fas fa-code"></i> PHP/群聊/私聊
                    </button>
                </div>
            </div>

            <!-- 管理员功能区（只在管理员可见时显示） -->
            <div class="sidebar-section" id="adminSidebarSection" style="display: none;">
                <h3><i class="fas fa-shield-alt"></i> 管理员功能</h3>
                <div class="function-buttons">
                    <button class="function-btn" onclick="openAdminPanel()" style="background: var(--md-sys-color-system);">
                        <i class="fas fa-cog"></i> 管理面板
                    </button>
                    <button class="function-btn" onclick="stopAIGeneration()" style="background: var(--md-sys-color-error);">
                        <i class="fas fa-stop"></i> 停止AI生成
                    </button>
                </div>
            </div>
        </div>
        
        <div class="sidebar-footer">
            <button class="md3-text-btn" onclick="resetExtSettings()">重置设置</button>
            <button class="md3-filled-btn" onclick="saveExtSettings()">保存设置</button>
        </div>
    </div>

    <!-- 其他组件 -->
    <div class="connection-status" id="connectionStatus">已连接</div>
    
    <div class="chat-container">
        <div class="messages-container" id="messagesContainer">
            <div class="system-message">正在连接聊天服务器...</div>
        </div>
    </div>

    <div class="banned-overlay" id="bannedOverlay">
        <div class="banned-message" id="bannedMessage">
            <i class="fas fa-ban" style="font-size: 24px; margin-bottom: 12px;"></i><br>
            您已被禁言，请稍后再试
        </div>
    </div>

    <!-- 文件上传模态框（MD3风格） -->
    <div id="uploadModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-file-upload"></i> 上传文件</h3>
                <button class="modal-close" onclick="closeUploadModal()">&times;</button>
            </div>
            <div class="modal-body">
                <input type="file" id="fileInput" style="display: none;" onchange="handleFileSelect()">
                <button class="file-select-btn" onclick="document.getElementById('fileInput').click()">
                    <i class="fas fa-paperclip"></i> 选择文件
                </button>
                <div class="file-info" id="fileInfo" style="display: none;">
                    <div>文件名: <span id="fileName"></span></div>
                    <div>大小: <span id="fileSize"></span></div>
                </div>
                <div class="upload-error" id="uploadError"></div>
                <div class="upload-progress" id="uploadProgress" style="display: none;">
                    <div class="progress-label">
                        <span>上传进度</span>
                        <span id="progressPercent">0%</span>
                    </div>
                    <div class="md3-progress-bar">
                        <div class="md3-progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text" id="progressText">正在上传...</div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="md3-text-btn" onclick="closeUploadModal()">取消</button>
                <button class="md3-filled-btn" id="uploadSubmitBtn" onclick="uploadFile()" disabled>上传</button>
            </div>
        </div>
    </div>
<!-- 语音录制模态框 -->
<div id="voiceModal" class="modal" style="display: none;">
    <div class="modal-content" style="max-width: 420px;">
        <div class="modal-header">
            <h3><i class="fas fa-microphone-alt"></i> 录制语音消息</h3>
            <button class="modal-close" onclick="closeVoiceModal()">&times;</button>
        </div>
        
        <div class="modal-body">
            <!-- === 选项卡头部 === -->
            <div style="display: flex; border-bottom: 1px solid var(--md-sys-color-outline-variant); position: relative; margin-bottom: 20px;">
                <div id="tabIndicator" style="position: absolute; bottom: -1px; left: 0; width: 50%; height: 2px; background: var(--md-sys-color-primary); transition: left 0.3s ease;"></div>
                
                <button id="tabHold" class="tab-header-btn active" onclick="switchVoiceTab('hold')" 
                        style="flex: 1; padding: 12px 0; background: none; border: none; font-size: 15px; cursor: pointer; font-weight: 500; color: var(--md-sys-color-primary);">
                    <i class="fas fa-hand-paper"></i> 按住说话
                </button>
                
                <button id="tabClick" class="tab-header-btn" onclick="switchVoiceTab('click')" 
                        style="flex: 1; padding: 12px 0; background: none; border: none; font-size: 15px; cursor: pointer; font-weight: 500; color: var(--md-sys-color-on-surface-variant);">
                    <i class="fas fa-play-circle"></i> 点击录制
                </button>
            </div>
            
            <!-- === 内容滑动容器 === -->
            <div id="tabContentContainer" style="overflow: hidden; position: relative; height: 180px;">
                <!-- 按住说话内容 -->
                <div id="contentHold" class="tab-content active" style="position: absolute; top: 0; left: 0; width: 100%; padding: 0 10px; transition: transform 0.3s ease;">
                    <div style="text-align: center;">
                        <button id="holdRecordBtn" class="md3-filled-btn" 
                                style="width: 130px; height: 130px; border-radius: 50%; font-size: 18px; position: relative;"
                                onmousedown="startVoiceRecording('hold')" onmouseup="stopVoiceRecording()"
                                ontouchstart="startVoiceRecording('hold')" ontouchend="stopVoiceRecording()">
                            <span id="holdIcon" style="font-size: 32px; display: block; margin-bottom: 8px;">🎤</span>
                            <div style="font-size: 15px; margin-bottom: 5px;">按住说话</div>
                            <div id="holdRecordingDot" style="display: none; position: absolute; top: 15px; right: 15px; width: 12px; height: 12px; background: #ff4444; border-radius: 50%;"></div>
                        </button>
                        <div style="margin-top: 12px; color: var(--md-sys-color-outline); font-size: 13px; line-height: 1.4;">
                            按住按钮开始录音，松开自动停止<br>
                            <span style="color: var(--md-sys-color-primary);">像微信一样简单</span>
                        </div>
                    </div>
                </div>
                
                <!-- 点击录制内容 -->
                <div id="contentClick" class="tab-content" style="position: absolute; top: 0; left: 100%; width: 100%; padding: 0 10px; transition: transform 0.3s ease;">
                    <div style="text-align: center;">
                        <button id="clickRecordBtn" class="md3-filled-btn" onclick="toggleClickRecording()"
                                style="width: 130px; height: 130px; border-radius: 50%; font-size: 18px; position: relative;">
                            <span id="clickIcon" style="font-size: 32px; display: block; margin-bottom: 8px;">🎤</span>
                            <div id="clickText" style="font-size: 15px; margin-bottom: 5px;">开始录音</div>
                            <div id="clickRecordingDot" style="display: none; position: absolute; top: 15px; right: 15px; width: 12px; height: 12px; background: #ff4444; border-radius: 50%;"></div>
                        </button>
                        <div style="margin-top: 15px;">
                            <button id="pauseResumeBtn" class="md3-text-btn" onclick="togglePauseResume()" disabled style="margin-right: 10px;">
                                <i class="fas fa-pause"></i> 暂停
                            </button>
                            <button id="cancelRecordBtn" class="md3-text-btn" onclick="cancelRecording()" disabled>
                                <i class="fas fa-times"></i> 取消
                            </button>
                        </div>
                        <div style="margin-top: 12px; color: var(--md-sys-color-outline); font-size: 13px; line-height: 1.4;">
                            点击开始录音，可暂停继续<br>
                            适合录制长语音
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- === 共用的比特率设置 === -->
            <div style="background: var(--md-sys-color-surface-container); border-radius: 12px; padding: 16px; margin: 20px 0;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <span style="font-size: 14px; color: var(--md-sys-color-on-surface);">
                        <i class="fas fa-sliders-h"></i> 音质设置
                    </span>
                    <span style="font-weight: bold; color: var(--md-sys-color-primary);">
                        <span id="bitrateValue">16</span>kbps
                    </span>
                </div>
                <input type="range" id="bitrateSlider" min="8" max="32" value="16" step="1" 
                       style="width: 100%; height: 6px; border-radius: 3px; background: var(--md-sys-color-surface-container-high);" 
                       oninput="updateBitrateDisplay()">
                <div style="display: flex; justify-content: space-between; margin-top: 6px;">
                    <span style="font-size: 11px; color: var(--md-sys-color-outline);">8kbps</span>
                    <span style="font-size: 11px; color: var(--md-sys-color-outline);">32kbps</span>
                </div>
                <div id="bitrateHint" style="font-size: 12px; color: var(--md-sys-color-primary); text-align: center; margin-top: 8px;">
                    约 120KB / 60秒
                </div>
            </div>
            
            <!-- === 录制状态显示 === -->
            <div id="recordingStatusArea" style="display: none; background: var(--md-sys-color-surface-container); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                <div style="text-align: center; margin-bottom: 12px;">
                    <div style="font-size: 14px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 4px;">录音完成</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--md-sys-color-primary);">
                        <span id="finalDuration">0</span>秒 / 
                        <span id="finalSize">0</span>KB
                    </div>
                </div>
                
                <div style="margin-top: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                        <span>存储占用</span>
                        <span id="sizePercent">0%</span>
                    </div>
                    <div class="md3-progress-bar">
                        <div class="md3-progress-fill" id="sizeProgress" style="width: 0%"></div>
                    </div>
                </div>
                
                <div id="statusMessage" style="text-align: center; margin-top: 12px; padding: 8px; border-radius: 8px; background: var(--md-sys-color-surface-container-high); font-size: 13px; color: var(--md-sys-color-on-surface);">
                    可以试听或直接发送
                </div>
            </div>
            
            <!-- === 试听区域 === -->
            <div id="playbackArea" style="display: none; margin-bottom: 16px;">
                <div style="font-size: 13px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 8px;">试听录音:</div>
                <audio id="voicePlayer" controls style="width: 100%;"></audio>
            </div>
            
            <!-- === 错误信息 === -->
            <div id="voiceError" class="upload-error" style="display: none; margin-bottom: 12px;"></div>
            
            <!-- === 操作按钮 === -->
            <div id="actionButtons" style="display: none; display: flex; gap: 12px;">
                <button class="md3-text-btn" onclick="reRecordVoice()" style="flex: 1;">
                    <i class="fas fa-redo"></i> 重新录制
                </button>
                <button class="md3-filled-btn" onclick="uploadVoiceMessage()" style="flex: 1;">
                    <i class="fas fa-paper-plane"></i> 发送语音
                </button>
            </div>
            
            <!-- === 上传进度 === -->
            <div id="uploadProgressArea" style="display: none; margin-top: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                    <span>上传进度</span>
                    <span id="uploadPercent">0%</span>
                </div>
                <div class="md3-progress-bar">
                    <div class="md3-progress-fill" id="uploadProgress" style="width: 0%"></div>
                </div>
                <div id="uploadStatus" style="text-align: center; margin-top: 8px; font-size: 12px; color: var(--md-sys-color-on-surface-variant);">
                    准备上传...
                </div>
            </div>
            
            <!-- 底部提示 -->
            <div style="font-size: 11px; color: var(--md-sys-color-outline); text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--md-sys-color-outline-variant);">
                <i class="fas fa-shield-alt"></i> 语音限制：最大60秒，200KB，每分钟只能发送1次
            </div>
        </div>
    </div>
</div>

<style>
.tab-header-btn {
    transition: color 0.2s ease;
}
.tab-content {
    display: none;
}
.tab-content.active {
    display: block;
}
@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
}
</style>
    <!-- 背景选择模态框 -->
    <div id="backgroundModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-image"></i> 选择聊天背景</h3>
                <button class="modal-close" onclick="closeBackgroundModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="background-options">
                    <div class="background-option" onclick="selectBackground('default')">
                        <div class="bg-color" style="background: var(--md-sys-color-surface); border: 1px solid var(--md-sys-color-outline-variant);"></div>
                        <div class="bg-name">默认背景</div>
                    </div>
                    <div class="background-option" onclick="selectBackground('gradient1')">
                        <div class="bg-color" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                        <div class="bg-name">紫色渐变</div>
                    </div>
                    <div class="background-option" onclick="selectBackground('gradient2')">
                        <div class="bg-color" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
                        <div class="bg-name">粉色渐变</div>
                    </div>
                    <div class="background-option" onclick="selectBackground('gradient3')">
                        <div class="bg-color" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
                        <div class="bg-name">蓝色渐变</div>
                    </div>
                    <div class="background-option" onclick="selectBackground('custom')">
                        <div class="bg-color" style="background: var(--md-sys-color-primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">
                            <i class="fas fa-image"></i>
                        </div>
                        <div class="bg-name">选择图片</div>
                    </div>
                    <div class="background-option" onclick="selectBackground('none')">
                        <div class="bg-color" style="background: white; border: 1px solid var(--md-sys-color-outline);"></div>
                        <div class="bg-name">无背景</div>
                    </div>
                </div>
                <input type="file" id="bgImageInput" accept="image/*" style="display: none;" onchange="handleBackgroundImageSelect()">
                <div class="upload-error" id="backgroundError"></div>
            </div>
            <div class="modal-footer">
                <button class="md3-text-btn" onclick="closeBackgroundModal()">取消</button>
                <button class="md3-filled-btn" onclick="applyBackground()">应用背景</button>
            </div>
        </div>
    </div>

    <!-- 收藏查看模态框 -->
    <div id="favoritesModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-star"></i> 收藏的消息</h3>
                <button class="modal-close" onclick="closeFavoritesModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="favorites-list" id="favoritesList">
                    <!-- 收藏消息动态添加 -->
                </div>
            </div>
        </div>
    </div>

    <!-- 消息搜索模态框 -->
<div id="searchModal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3><i class="fas fa-search"></i> 消息搜索</h3>
            <button class="modal-close" onclick="closeSearchModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="margin-bottom: 16px;">
                <input type="text" id="searchInputBox" class="keyword-input" 
                       placeholder="输入关键词搜索聊天记录..." 
                       style="width: 100%; padding: 12px; font-size: 16px;"
                       onkeypress="if(event.key==='Enter') searchMessages()">
            </div>
            <div style="font-size: 13px; color: var(--md-sys-color-outline); margin-bottom: 10px;">
                按Enter搜索，支持中文、英文、数字
            </div>
            
            <div id="searchResults" style="max-height: 400px; overflow-y: auto; display: none;">
                <!-- 搜索结果动态添加 -->
            </div>
            
            <div id="searchTips" style="text-align: center; padding: 30px; color: var(--md-sys-color-outline);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <div>输入关键词搜索聊天记录</div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="md3-text-btn" onclick="clearSearch()">清除高亮</button>
            <button class="md3-filled-btn" onclick="searchMessages()">搜索</button>
        </div>
    </div>
</div>

     <!-- 说明模态框 -->
<div id="instructionsModal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3><i class="fas fa-info-circle"></i> 使用说明</h3>
            <button class="modal-close" onclick="document.getElementById('instructionsModal').style.display = 'none'">&times;</button>
        </div>
        <div class="modal-body">
            <div class="user-agreement-content">
                <!-- 这里完全由你自定义 -->
                <div class="agreement-item">
                    <div class="agreement-item-icon">1️⃣</div>
                    <div>
                        <strong>消息</strong><br>
                        双击消息可以展开快捷键，三击顶部切换字体
                    </div>
                </div>
                
                <div class="agreement-item">
                    <div class="agreement-item-icon">2️⃣</div>
                    <div>
                        <strong>拓展功能</strong><br>
                        点击左上角三条杠，可以展开拓展功能栏
                        点击功能操作→PHP/群聊/私聊查看更多功能
                    </div>
                </div>
                
                <div class="agreement-item">
                    <div class="agreement-item-icon">3️⃣</div>
                    <div>
                        <strong>gemma</strong><br>
                        发送gemma+问题
                    </div>
                </div>
                
                <div class="agreement-item">
                    <div class="agreement-item-icon">4️⃣</div>
                    <div>
                        <strong>没了</strong><br>
                        这里是第四条的内容。
                        旧版页面路径/zhuwww访问
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="md3-filled-btn" onclick="document.getElementById('instructionsModal').style.display = 'none'">
                我知道了
            </button>
        </div>
    </div>
</div>
    <!-- 收藏消息模态框 -->
    <div id="collectMessagesModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-star"></i> 选择消息收藏</h3>
                <button class="modal-close" onclick="closeCollectMessagesModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div id="collectMessagesList" style="max-height: 400px; overflow-y: auto;">
                    <!-- 可收藏的消息列表动态添加 -->
                </div>
                <div style="margin-top: 16px; font-size: 12px; color: var(--md-sys-color-outline); text-align: center;">
                    勾选要收藏的消息，最多可选择10条
                </div>
            </div>
            <div class="modal-footer">
                <button class="md3-text-btn" onclick="closeCollectMessagesModal()">取消</button>
                <button class="md3-filled-btn" onclick="saveSelectedFavorites()">保存收藏</button>
            </div>
        </div>
    </div>
<!--═══════════════PHP═══════════════-->
<!-- 放在文件末尾 -->

<!-- PHP服务选择模态框 -->
<div id="phpServicesModal" class="modal" style="display: none;">
    <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
            <h3><i class="fas fa-server"></i> PHP服务</h3>
            <button class="modal-close" onclick="closePHPServicesModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div id="phpServicesList">
                <!-- 动态加载 -->
            </div>
        </div>
    </div>
</div>

<!-- PHP服务展示模态框 -->
<div id="phpServiceModal" class="modal" style="display: none; z-index: 10002;">
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; display: flex; flex-direction: column;">
        <!-- 顶部栏 -->
        <div style="background: var(--md-sys-color-primary); color: white; padding: 0 20px; height: 60px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <button onclick="backToServiceList()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div id="currentServiceName">PHP服务</div>
            </div>
            <button onclick="closePHPServiceModal()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <!-- iframe -->
        <iframe 
    id="phpServiceFrame" 
    style="width: 100%; height: 100%; border: none; transform-origin: 0 0;"
    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
    scrolling="yes"
></iframe>
    </div>
</div>


    <!-- 管理员面板 -->
    <div id="adminPanel" class="modal" style="display: none;">
        <div class="admin-panel">
            <div class="modal-header">
                <h3><i class="fas fa-cog"></i> 管理员设置</h3>
                <button class="modal-close" onclick="closeAdminPanel()">&times;</button>
            </div>
            
            <div class="admin-section" id="adminAuthSection">
                <h4>管理员验证</h4>
                <div style="margin-bottom: 16px;">
                    <input type="password" id="adminPassword" class="keyword-input" placeholder="请输入管理员密码" style="width: 100%; margin-bottom: 12px;">
                    <button class="md3-filled-btn" onclick="verifyAdminPassword()" style="width: 100%;">验证密码</button>
                </div>
            </div>
            
            <div class="admin-section" id="adminSettingsSection" style="display: none;">
                <h4>系统设置</h4>
                <div class="setting-item">
                    <span class="setting-label">内存消息数量:</span>
                    <input type="number" id="maxMemoryMessages" class="setting-input" min="50" max="500" value="400">
                </div>
                <div class="setting-item">
                    <span class="setting-label">自动保存数量:</span>
                    <input type="number" id="autoSaveCount" class="setting-input" min="10" max="200" value="100">
                </div>
                <div class="setting-item">
                    <span class="setting-label">请求频率限制:</span>
                    <input type="number" id="maxRequestsPerMinute" class="setting-input" min="10" max="500" value="180">
                </div>
                <div class="setting-item">
                    <span class="setting-label">IP封禁时长(秒):</span>
                    <input type="number" id="ipBanDuration" class="setting-input" min="10" max="3600" value="300">
                </div>
                <div class="setting-item">
                    <span class="setting-label">消息频率限制:</span>
                    <input type="number" id="messageRateLimit" class="setting-input" min="1" max="20" value="6">
                </div>
                <div class="setting-item">
                    <span class="setting-label">消息长度限制:</span>
                    <input type="number" id="messageLengthLimit" class="setting-input" min="10" max="200" value="78">
                </div>
                <div class="setting-item">
                    <span class="setting-label">用户下载次数限制:</span>
                    <input type="number" id="maxDownloadsPerUser" class="setting-input" min="0" max="100" value="1">
                </div>
            </div>

            <div class="admin-section" id="adminActionsSection" style="display: none;">
                <h4>管理操作</h4>
                <div class="admin-actions">
                    <button class="admin-action-btn success" onclick="updateSettings()">保存设置</button>
                    <button class="admin-action-btn warning" onclick="clearChat()">清空聊天</button>
                    <button class="admin-action-btn" onclick="unbanAll()">解除封禁</button>
                    <button class="admin-action-btn" onclick="resetDownloadCounts()">重置下载</button>
                    <button class="admin-action-btn" onclick="loadSettings()">刷新设置</button>
                    <button class="admin-action-btn" onclick="stopAIGeneration()">停止AI</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 消息右键菜单 -->
    <div class="message-context-menu" id="contextMenu">
        <div class="context-menu-item favorite" onclick="collectCurrentMessage()">
            <i class="fas fa-star"></i> 收藏消息
        </div>
        <div class="context-menu-item delete" onclick="deleteSelectedMessage()">
            <i class="fas fa-trash"></i> 删除消息
        </div>
    </div>

    <!-- 音乐悬浮窗 -->
    <div class="music-widget minimized" id="musicWidget">
        <div class="mini-player" id="miniPlayer">
            <div class="album-art" id="albumArt">
                <span class="music-icon">🎵</span>
            </div>
            <div class="mini-controls">
                <button class="mini-btn" id="miniPrevBtn">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="mini-btn" id="miniPlayPauseBtn">
                    <i class="fas fa-play"></i>
                </button>
                <button class="mini-btn" id="miniNextBtn">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>
        </div>
        
        <div class="expanded-content" id="expandedContent" style="display: none;">
            <div class="music-header">
                <span>音乐播放器</span>
                <button class="close-btn" id="closeBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="now-playing" id="nowPlaying">
                <div class="now-playing-cover" id="nowPlayingCover"></div>
                <div class="now-playing-info">
                    <div class="now-playing-title" id="nowPlayingTitle">未播放</div>
                    <div class="now-playing-artist" id="nowPlayingArtist">选择歌曲</div>
                </div>
            </div>
            
            <div class="progress-container" id="progressContainer">
                <div class="progress-bar" id="progressBar"></div>
            </div>
            
            <div class="time-display">
                <span id="currentTime">0:00</span>
                <span id="duration">0:00</span>
            </div>
            
            <div class="music-controls">
                <button class="control-btn" id="prevBtn">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="control-btn play-pause" id="playPauseBtn">
                    <i class="fas fa-play"></i>
                </button>
                <button class="control-btn" id="nextBtn">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>
            
            <div class="volume-control">
                <i class="fas fa-volume-down"></i>
                <input type="range" id="volumeSlider" min="0" max="100" value="50">
                <i class="fas fa-volume-up"></i>
            </div>
            
            <div class="search-section">
                <select id="apiSelector">
                    <option value="netease">网易云</option>
                    <option value="qq">QQ音乐</option>
                    <option value="kugou">酷狗</option>
                </select>
                <input type="text" id="searchInput" placeholder="搜索歌曲">
                <button class="search-btn" id="searchBtn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="search-results" id="musicSearchResults">
                <!-- 搜索结果动态添加 -->
            </div>
        </div>
    </div>
    
    <!-- 聊天输入 -->
    <div class="chat-input-container">
        <div style="position: relative; flex: 1;">
            <textarea id="messageInput" placeholder="输入消息，使用 @ai 提问AI助手..." rows="1" maxlength="200"></textarea>
            <div class="char-count" id="charCount">0/200</div>
        </div>
        <button id="sendButton" onclick="sendMessage()">发送</button>
    </div>`;

    // 处理内联样式
    function processInlineStyles(element) {
        // 如果需要处理内联样式可以在这里扩展
        return element;
    }

    // 主函数：注入HTML到页面
    function injectHTML() {
        // 插入到body末尾
        document.body.insertAdjacentHTML('beforeend', HTML_CONTENT);

        // 处理内联样式
        const newElements = document.body.lastElementChild;
        if (newElements) {
            processInlineStyles(newElements);
        }
        
        console.log('✅ HTML内容已动态注入到页面');
    }

    // 执行时机控制
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHTML);
    } else {
        injectHTML();
    }

    // 提供外部调用接口
    window.reloadDynamicHTML = function(newHTML) {
        // 重新加载HTML内容（示例）
        console.log('🔄 重新加载HTML');
    };
    
    window.removeDynamicHTML = function() {
        // 移除动态HTML（示例）
        console.log('🗑️ 移除动态HTML');
    };
})();