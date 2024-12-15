// 鼠标效果管理器
const CursorManager = {
    cursor: null,
    cursorBlur: null,

    init() {
        if (this.cursor || this.cursorBlur) return; // 防止重复初始化

        // 创建鼠标元素
        this.cursor = document.createElement('div');
        this.cursor.id = 'cursor';
        this.cursor.style.transform = 'translate(-100px, -100px)'; // 初始位置在屏幕外
        document.body.appendChild(this.cursor);

        // 创建模糊效果
        this.cursorBlur = document.createElement('div');
        this.cursorBlur.id = 'cursor-blur';
        this.cursorBlur.style.transform = 'translate(-100px, -100px)'; // 初始位置在屏幕外
        document.body.appendChild(this.cursorBlur);

        // 绑定鼠标移动事件
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                if (this.cursor && this.cursorBlur) {
                    this.cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
                    this.cursorBlur.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
                }
            });
        });

        // 处理鼠标进入/离开窗口
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorBlur.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorBlur.style.opacity = '1';
        });
    }
}; 