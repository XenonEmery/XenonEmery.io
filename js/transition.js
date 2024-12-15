// 页面过渡动画管理器
const TransitionManager = {
    // 创建过渡层
    createTransition() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        transition.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 400%;
            height: 400%;
            transform-origin: center;
            transform: translate(-50%, -50%);
            background: conic-gradient(
                from 0deg,
                ${BackgroundManager.defaultColors.join(', ')}
            );
            opacity: 0;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(transition);
        return transition;
    },

    // 执行页面切换
    navigate(url, direction = 'forward') {
        const transition = this.createTransition();
        
        // 预加载目标页面
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        
        // 执行过渡动画
        requestAnimationFrame(() => {
            transition.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            transition.style.opacity = '1';
            transition.style.transform = direction === 'forward' 
                ? 'translate(-50%, -50%) rotate(360deg)'
                : 'translate(-50%, -50%) rotate(-360deg)';
            
            // 在页面跳转前添加一个样式来防止白屏
            const style = document.createElement('style');
            style.textContent = `
                body::after {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: ${BackgroundManager.defaultColors[0]};
                    z-index: 9998;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                body.transitioning::after {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
            
            // 在跳转前添加过渡类
            document.body.classList.add('transitioning');
            
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    }
}; 