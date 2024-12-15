window.initCustomCursor = function() {
    const style = document.createElement('style');
    style.textContent = `
        body {
            cursor: none !important;
        }

        .custom-cursor {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 1);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                       0 0 20px rgba(255, 255, 255, 0.6),
                       0 0 30px rgba(255, 255, 255, 0.4);
        }

        .cursor-trail {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%) scale(0.8);
            transition: opacity 0.15s ease;
            z-index: 99998;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6),
                       0 0 16px rgba(255, 255, 255, 0.4);
        }

        .custom-cursor.hover {
            transform: translate(-50%, -50%) scale(3);
            transition: transform 0.3s ease;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
                       0 0 30px rgba(255, 255, 255, 0.6),
                       0 0 45px rgba(255, 255, 255, 0.4);
        }
    `;
    document.head.appendChild(style);

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const numTrails = 12;
    const trails = [];
    let mouseX = 0;
    let mouseY = 0;

    // 创建拖影元素
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / numTrails) * 0.5;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            speed: 0.15 - (i * 0.01) // 每个拖影有不同的跟随速度
        });
    }

    // 更新拖影位置的函数
    function updateTrails() {
        trails.forEach((trail, index) => {
            if (index === 0) {
                // 第一个拖影跟随鼠标
                trail.x += (mouseX - trail.x) * trail.speed;
                trail.y += (mouseY - trail.y) * trail.speed;
            } else {
                // 其他拖影跟随前一个拖影
                const prevTrail = trails[index - 1];
                trail.x += (prevTrail.x - trail.x) * trail.speed;
                trail.y += (prevTrail.y - trail.y) * trail.speed;
            }

            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });

        requestAnimationFrame(updateTrails);
    }

    // 开始动画循环
    updateTrails();

    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // 鼠标悬浮效果
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('clickable')) {
            cursor.classList.add('hover');
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
            });
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('clickable')) {
            cursor.classList.remove('hover');
            trails.forEach((trail, index) => {
                trail.element.style.opacity = (1 - index / numTrails) * 0.5;
            });
        }
    });

    // 处理鼠标离开页面的情况
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trails.forEach(trail => {
            trail.element.style.opacity = '0';
        });
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        trails.forEach((trail, index) => {
            trail.element.style.opacity = (1 - index / numTrails) * 0.5;
        });
    });
}; 