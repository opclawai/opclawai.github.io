/**
 * 拼豆图纸官网 - 最终优化版脚本
 */

(function () {
    'use strict';

    /* ========= 1. 预加载动画 ========= */
    function initPreloader() {
        var el = document.getElementById('preloader');
        if (!el) return;

        function hide() {
            el.classList.add('hidden');
            setTimeout(function () { el.style.display = 'none'; }, 700);
        }

        if (document.readyState === 'complete') {
            setTimeout(hide, 600);
        } else {
            window.addEventListener('load', function () { setTimeout(hide, 600); });
        }
    }

    /* ========= 2. 滚动进度条 ========= */
    function initScrollProgress() {
        var bar = document.getElementById('scrollProgress');
        if (!bar) return;

        function update() {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var pct = dh > 0 ? (st / dh) * 100 : 0;
            bar.style.width = Math.min(pct, 100) + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ========= 3. 全局粒子 ========= */
    function initParticles() {
        var c = document.getElementById('particles');
        if (!c) return;

        var colors = ['#FF6B6B', '#6366F1', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
        var n = window.innerWidth < 768 ? 18 : 35;

        for (var i = 0; i < n; i++) {
            var d = document.createElement('div');
            d.className = 'dot';
            var s = Math.random() * 5 + 3;
            d.style.width = s + 'px';
            d.style.height = s + 'px';
            d.style.background = colors[Math.floor(Math.random() * colors.length)];
            d.style.left = Math.random() * 100 + '%';
            d.style.bottom = '-10px';
            d.style.animationDuration = (Math.random() * 12 + 8) + 's';
            d.style.animationDelay = (Math.random() * 10) + 's';
            c.appendChild(d);
        }
    }

    /* ========= 4. 数字滚动 ========= */
    function initCountUp() {
        var els = document.querySelectorAll('.stat-number[data-target]');
        if (!els.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                if (el.dataset.done) return;
                el.dataset.done = '1';
                var target = parseInt(el.dataset.target, 10);
                animateNumber(el, 0, target, 1600);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        els.forEach(function (el) { observer.observe(el); });
    }

    function animateNumber(el, start, end, duration) {
        var t0 = performance.now();
        var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
        var suffix = el.dataset.suffix || '';

        function step(now) {
            var elapsed = now - t0;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(start + (end - start) * ease(progress));
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = end + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    /* ========= 5. 滚动揭示 ========= */
    function initReveal() {
        var items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.07) + 's';
            observer.observe(el);
        });
    }

    /* ========= 6. Canvas 拼豆演示 ========= */
    function initDemoCanvas() {
        var canvas = document.getElementById('demoCanvas');
        if (!canvas) return;

        var ctx = canvas.getContext('2d');
        var GRID = 10;
        var cell = canvas.width / GRID;

        var pattern = [
            [0,0,1,1,0,0,0,0,1,1],
            [0,1,1,1,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,0]
        ];

        var colors = ['#FF6B6B','#4ECDC4','#FFE66D','#6366F1','#F59E0B','#EC4899','#10B981','#F97316'];

        function drawBead(x, y, color) {
            var cx = x + cell / 2;
            var cy = y + cell / 2;
            var r = cell / 2 - 1.5;

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx - r * 0.28, cy - r * 0.28, r * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.42)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#F9FAFB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (var row = 0; row < pattern.length; row++) {
                for (var col = 0; col < pattern[row].length; col++) {
                    if (pattern[row][col] === 1) {
                        drawBead(col * cell, row * cell, colors[(row * 3 + col * 2) % colors.length]);
                    }
                }
            }

            ctx.strokeStyle = 'rgba(0,0,0,0.05)';
            ctx.lineWidth = 0.5;
            for (var i = 0; i <= GRID; i++) {
                ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, canvas.height); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(canvas.width, i * cell); ctx.stroke();
            }
        }

        canvas.addEventListener('click', function (e) {
            var rect = canvas.getBoundingClientRect();
            var x = (e.clientX - rect.left) * (canvas.width / rect.width);
            var y = (e.clientY - rect.top) * (canvas.height / rect.height);
            var col = Math.floor(x / cell);
            var row = Math.floor(y / cell);

            if (row >= 0 && row < pattern.length && col >= 0 && col < pattern[0].length) {
                pattern[row][col] = pattern[row][col] === 1 ? 0 : 1;
                draw();

                var countEl = document.getElementById('beadCount');
                if (countEl) {
                    var total = 0;
                    for (var r = 0; r < pattern.length; r++)
                        for (var c = 0; c < pattern[r].length; c++)
                            total += pattern[r][c];
                    countEl.textContent = total + '\u9897';
                }
            }
        });

        draw();
    }

    /* ========= 7. 导航栏 ========= */
    function initNavbar() {
        var nav = document.getElementById('navbar');
        if (!nav) return;

        function onScroll() {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ========= 8. 移动端菜单 ========= */
    function initMobileMenu() {
        var toggle = document.getElementById('navToggle');
        var menu = document.getElementById('navMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }

    /* ========= 9. 平滑锚点滚动 ========= */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href === '#') return;
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var nav = document.getElementById('navbar');
                    var offset = nav ? nav.offsetHeight + 12 : 12;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });
    }

    /* ========= 10. 品牌标签切换 ========= */
    function initBrandTags() {
        document.querySelectorAll('.phone-pill').forEach(function (pill) {
            pill.addEventListener('click', function () {
                document.querySelectorAll('.phone-pill').forEach(function (p) { p.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    }

    /* ========= 11. FAQ 手风琴 ========= */
    function initFAQ() {
        var btns = document.querySelectorAll('.faq-question');
        if (!btns.length) return;

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var item = this.closest('.faq-item');
                if (!item) return;
                var isActive = item.classList.contains('active');

                document.querySelectorAll('.faq-item.active').forEach(function (el) {
                    el.classList.remove('active');
                    var ans = el.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    var ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
                }
            });
        });

        var first = document.querySelector('.faq-item');
        if (first) {
            first.classList.add('active');
            var ans = first.querySelector('.faq-answer');
            if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
        }
    }

    /* ========= 12. 浮动 CTA ========= */
    function initFloatingCTA() {
        var cta = document.getElementById('floatingCta');
        if (!cta) return;

        var hero = document.getElementById('hero');
        var download = document.getElementById('download');
        if (!hero || !download) return;

        function update() {
            var sy = window.scrollY;
            var heroBottom = hero.getBoundingClientRect().bottom + sy;
            var downloadTop = download.getBoundingClientRect().top + sy;
            var show = sy > heroBottom && sy < downloadTop - window.innerHeight;
            cta.classList.toggle('visible', show);
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ========= 13. 回到顶部按钮 ========= */
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        function update() {
            btn.classList.toggle('visible', window.scrollY > 400);
        }

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ========= 14. 评价轮播 ========= */
    function initTestiSlider() {
        var cards = document.querySelectorAll('.testi-card');
        if (!cards.length) return;

        /* 桌面端：自动轮播高亮 */
        if (window.innerWidth < 768) return;

        var current = 0;
        cards[current].classList.add('visible');

        setInterval(function () {
            cards[current].classList.remove('visible');
            current = (current + 1) % cards.length;
            cards[current].classList.add('visible');
        }, 4000);
    }

    /* ========= 初始化 ========= */
    function init() {
        initPreloader();
        initScrollProgress();
        initParticles();
        initDemoCanvas();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initReveal();
        initCountUp();
        initBrandTags();
        initFAQ();
        initFloatingCTA();
        initBackToTop();
        initTestiSlider();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
