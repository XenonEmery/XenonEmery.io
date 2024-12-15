// 背景动画管理器
const BackgroundManager = {
    // 默认颜色配置
    defaultColors: [
        '#FF7E5F',  /* 柔和橙 */
        '#FEB47B',  /* 过渡色1 */
        '#56AB2F',  /* 草原绿 */
        '#A8E063',  /* 过渡色2 */
        '#4E54C8',  /* 深紫 */
        '#8F94FB',  /* 过渡色3 */
        '#FF9A9E',  /* 浪漫粉 */
        '#FAD0C4',  /* 过渡色4 */
        '#00C9FF',  /* 海洋蓝 */
        '#92FE9D',  /* 过渡色5 */
        '#FC4A1A',  /* 热情橙 */
        '#F7B733',  /* 过渡色6 */
        '#E0EAF8',  /* 冰雪白 */
        '#CFDEF3',  /* 过渡色7 */
        '#FF9966',  /* 黄昏橙 */
        '#FF5E62'   /* 晚霞红 */

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