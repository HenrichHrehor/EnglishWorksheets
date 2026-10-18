/**
 * English worksheet levels — shared hub + worksheet chrome.
 * URL: ?level=starter | supported | advanced (aliases: easy → starter, expert → advanced)
 */
(function (global) {
    var LEVELS = [
        {
            key: 'starter',
            label: 'Starter',
            title: 'Starter — friendly first step (choose / guided)'
        },
        {
            key: 'supported',
            label: 'Supported',
            title: 'Supported — 10 items, simpler pool, choose or type where available'
        },
        {
            key: 'advanced',
            label: 'Expert',
            title: 'Expert — full practice, harder items, all modes'
        }
    ];

    var ENGLISH_LEVEL_FILES = {
        'worksheet1.html': true,
        'worksheet2.html': true,
        'worksheet6.html': true,
        'worksheet7.html': true
    };

    function normalizeLevel(raw) {
        var level = (raw || 'advanced').toLowerCase();
        if (level === 'easy') return 'starter';
        if (level === 'expert') return 'advanced';
        if (level === 'starter' || level === 'supported' || level === 'advanced') return level;
        return 'advanced';
    }

    function levelFromUrl() {
        return normalizeLevel(new URLSearchParams(global.location.search).get('level'));
    }

    function profileBadgeText(level) {
        if (level === 'starter') return 'Starter · you\'ve got this';
        if (level === 'supported') return 'Supported · 10 questions';
        return 'Expert · full practice';
    }

    function levelIconSvg(key) {
        if (key === 'starter') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.8 5.7 21l2.3-7-6-4.6h7.6L12 2z"/></svg>';
        }
        if (key === 'supported') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8" cy="12" r="6"/><path d="M14 8l6 4-6 4V8z"/></svg>';
        }
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 18V6M12 18V4M18 18v-8"/></svg>';
    }

    function worksheetHref(file, level) {
        if (!ENGLISH_LEVEL_FILES[file]) return file;
        return file + '?level=' + normalizeLevel(level || 'starter');
    }

    function hubLevelLinksHtml(file, escapeHtml) {
        if (!ENGLISH_LEVEL_FILES[file]) return '';
        return LEVELS.map(function (lv) {
            var href = worksheetHref(file, lv.key);
            return '<a class="level-link level-link--' + lv.key + '" href="' + href + '" title="' + escapeHtml(lv.title) + '">'
                + levelIconSvg(lv.key) + escapeHtml(lv.label) + '</a>';
        }).join('');
    }

    function buildWorksheetLevelSwitch(pageFile, activeLevel) {
        var nav = global.document.getElementById('levelSwitch');
        if (!nav) return;
        var level = normalizeLevel(activeLevel || levelFromUrl());
        nav.innerHTML = LEVELS.map(function (item) {
            var active = level === item.key ? ' active' : '';
            return '<a href="' + pageFile + '?level=' + item.key + '" class="' + active.trim() + '" title="' + item.title + '">'
                + levelIconSvg(item.key) + item.label + '</a>';
        }).join('');
    }

    function applyDocumentLevelUi(level) {
        var root = global.document.documentElement;
        root.classList.remove('ui-starter', 'ui-supported', 'ui-advanced');
        if (level === 'starter') root.classList.add('ui-starter');
        if (level === 'supported') root.classList.add('ui-supported');
        if (level === 'advanced') root.classList.add('ui-advanced');
    }

    function appendProfileBadgeToHeading(selector) {
        var el = global.document.querySelector(selector);
        if (!el || el.querySelector('.profile-badge')) return;
        var span = global.document.createElement('span');
        span.className = 'profile-badge';
        span.textContent = profileBadgeText(levelFromUrl());
        el.appendChild(global.document.createTextNode(' '));
        el.appendChild(span);
    }

    function initWorksheetChrome(pageFile, headingSelector) {
        var level = levelFromUrl();
        applyDocumentLevelUi(level);
        buildWorksheetLevelSwitch(pageFile, level);
        if (headingSelector) appendProfileBadgeToHeading(headingSelector);
        return level;
    }

    global.EnglishLevels = {
        LEVELS: LEVELS,
        ENGLISH_LEVEL_FILES: ENGLISH_LEVEL_FILES,
        normalizeLevel: normalizeLevel,
        levelFromUrl: levelFromUrl,
        profileBadgeText: profileBadgeText,
        levelIconSvg: levelIconSvg,
        worksheetHref: worksheetHref,
        hubLevelLinksHtml: hubLevelLinksHtml,
        buildWorksheetLevelSwitch: buildWorksheetLevelSwitch,
        applyDocumentLevelUi: applyDocumentLevelUi,
        initWorksheetChrome: initWorksheetChrome
    };
}(window));
