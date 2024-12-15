// 背景动画管理器
const BackgroundManager = {
    // 默认颜色配置
    defaultColors: [
        '#FF6B6B',  /* 珊瑚红 */
        '#FF8E53',  /* 过渡色1 */
        '#4ECDC4',  /* 青绿 */
        '#45B7D1',  /* 天蓝 */
        '#6C88C4',  /* 过渡色2 */
        '#8B5CF6',  /* 紫色 */
        '#B86EFF',  /* 过渡色3 */
        '#EC4899',  /* 粉红 */
        '#FF6B8B',  /* 过渡色4 */
        '#F59E0B',  /* 金色 */
        '#10B981',  /* 翠绿 */
        '#3B82F6',  /* 蓝色 */
        '#6366F1',  /* 过渡色5 */
        '#9333EA',  /* 深紫 */
        '#C084FC',  /* 过渡色6 */
        '#FF6B6B'   /* 回到起始色 */
    ],

    // 初始化背景
    init(options = {}) {
        const defaultOptions = {
            colors: this.defaultColors,
            duration: 30,    // 动画时长（秒）
            blur: 0.5,       // 模糊程度（像素）
            opacity: 1       // 背景透明度
        };

        const settings = { ...defaultOptions, ...options };

        // 创建背景样式
        const style = document.createElement('style');
        style.textContent = `
            body::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 400%;
                height: 400%;
                transform-origin: center;
                transform: translate(-50%, -50%);
                background: conic-gradient(
                    from 0deg,
                    ${settings.colors.join(', ')}
                );
                opacity: ${settings.opacity};
                filter: blur(${settings.blur}px);
                animation: 
                    backgroundAppear 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                    spin ${settings.duration}s linear infinite;
                z-index: -1;
            }

            body::after {
                content: '';
                position: fixed;
                inset: 0;
                background: radial-gradient(
                    circle at center,
                    transparent 0%,
                    rgba(0, 0, 0, 0.1) 100%
                );
                z-index: -1;
                pointer-events: none;
            }

            @keyframes backgroundAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
                }
                100% {
                    opacity: ${settings.opacity};
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }

            @keyframes spin {
                from {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
                to {
                    transform: translate(-50%, -50%) rotate(360deg);
                }
            }
        `;

        document.head.appendChild(style);
    }
}; 