// Приложение для изучения японской каны
const VOWELS = ['a', 'i', 'u', 'e', 'o'];

class KanaApp {
    constructor() {
        this.currentKana = null;
        this.deck = [];          // перемешанная очередь символов, пока не показаны все
        this.deckKey = null;     // какой набор символов сейчас в очереди
        this.groupScript = 'hiragana'; // какой алфавит показан во вкладке групп
        this.yoonScript = 'hiragana';  // какой алфавит показан в таблице ёон
        this.kanaMap = this.buildKanaMap(); // кана → ромадзи, для имён файлов звука
        this.stats = {
            correct: 0,
            total: 0
        };
        this.settings = {
            scriptMode: 'both',
            practiceMode: 'kana',
            selectedGroups: { hiragana: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], katakana: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], yoon: [] },
            practiceAudio: false,
            practiceVoice: 'f',
            tableVoice: 'f',
            theme: 'system',
            palette: 'violet',
            customColor: '#667eea',
            font: 'zen-maru-gothic',
            wordLength: 2          // для режима «Слова»: 2..5 символов, 6 = 6 и более
        };

        // Встроенные шрифты (файлы лежат в fonts/, подключены в index.html)
        this.fontStacks = {
            'noto-sans-jp': "'noto-sans-jp', 'Noto Sans JP', sans-serif",
            'noto-serif-jp': "'noto-serif-jp', 'Noto Serif JP', serif",
            'zen-kaku-gothic': "'zen-kaku-gothic', 'Zen Kaku Gothic New', sans-serif",
            'zen-maru-gothic': "'zen-maru-gothic', 'Zen Maru Gothic', sans-serif",
            'kosugi-maru': "'kosugi-maru', 'Kosugi Maru', sans-serif"
        };

        this.loadSettings();
        this.applyAppearance();
        localStorage.removeItem('kanaStats'); // статистика живёт только до перезагрузки страницы
        this.initializeElements();
        this.updateVoiceButtons();
        this.attachEventListeners();
        this.renderGroupsGrid();
        this.updateStats();
        this.nextKana();
    }

    initializeElements() {
        this.practiceView = document.getElementById('practice-view');
        this.tableView = document.getElementById('table-view');
        this.settingsView = document.getElementById('settings-view');
        this.kanaDisplay = document.getElementById('kana-display');
        this.wordMeaning = document.getElementById('word-meaning');
        this.wordNote = document.getElementById('word-note');
        this.answerInput = document.getElementById('answer-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.feedback = document.getElementById('feedback');
        this.correctCount = document.getElementById('correct-count');
        this.totalCount = document.getElementById('total-count');
        this.accuracy = document.getElementById('accuracy');
        this.resetStatsBtn = document.getElementById('reset-stats');
        this.selectAllGroupsBtn = document.getElementById('select-all-groups');
        this.deselectAllGroupsBtn = document.getElementById('deselect-all-groups');
        this.selectBasicGroupsBtn = document.getElementById('select-basic-groups');
        this.groupsGrid = document.getElementById('groups-grid');
        this.fontSelect = document.getElementById('font-select');
        this.fontPreview = document.getElementById('font-preview');
        this.practiceAudio = document.getElementById('practice-audio-checkbox');
        this.practiceVoiceFemaleBtn = document.getElementById('practive-voice-female');
        this.practiceVoiceMaleBtn = document.getElementById('practive-voice-male');
        this.tableVoiceFemaleBtn = document.getElementById('table-voice-female');
        this.tableVoiceMaleBtn = document.getElementById('table-voice-male');
    }

    attachEventListeners() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });

        this.submitBtn.addEventListener('click', () => this.checkAnswer());

        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });

        // Экранная клавиатура перекрывает кнопку: прокручиваем к ней при фокусе на поле
        this.answerInput.addEventListener('focus', () => {
            setTimeout(() => this.submitBtn.scrollIntoView({ block: 'center', behavior: 'smooth' }), 300);
        });

        document.querySelectorAll('[data-script]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-script]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderKanaTable(e.target.dataset.script);
            });
        });

        document.querySelectorAll('input[name="script-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.scriptMode = e.target.value;
                this.saveSettings();
                this.nextKana();
            });
        });

        document.querySelectorAll('input[name="practice-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.practiceMode = e.target.value;
                this.saveSettings();
                this.updateInputPlaceholder();
                this.nextKana();
            });
        });

        document.querySelectorAll('[data-group-script]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.groupScript = btn.dataset.groupScript;
                this.renderGroupsGrid();
            });
        });

        this.selectAllGroupsBtn.addEventListener('click', () => {
            this.settings.selectedGroups[this.groupScript] = this.groupsForTab(this.groupScript);
            this.saveSettings();
            this.renderGroupsGrid();
            this.nextKana();
        });

        this.deselectAllGroupsBtn.addEventListener('click', () => {
            this.settings.selectedGroups[this.groupScript] = [];
            this.ensureVowelFallback(this.groupScript);
            this.saveSettings();
            this.renderGroupsGrid();
            this.nextKana();
        });

        this.selectBasicGroupsBtn.addEventListener('click', () => {
            this.settings.selectedGroups[this.groupScript] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            this.saveSettings();
            this.renderGroupsGrid();
            this.nextKana();
        });

        this.resetStatsBtn.addEventListener('click', () => this.resetStats());

        // Клик по ячейке таблицы (делегирование: таблица перерисовывается)
        document.getElementById('kana-table').addEventListener('click', (e) => {
            const cell = e.target.closest('td[data-kana]');
            if (cell) this.playKanaTable(cell.dataset.kana, cell.dataset.script);
        });

        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.theme = e.target.value;
                this.saveSettings();
                this.applyAppearance();
            });
        });

        document.querySelectorAll('input[name="palette"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.palette = e.target.value;
                this.saveSettings();
                this.applyAppearance();
            });
        });

        const customColorInput = document.getElementById('custom-color');
        customColorInput.addEventListener('input', (e) => {
            this.settings.customColor = e.target.value;
            // Выбор цвета сразу переключает палитру на «Свой цвет»
            this.settings.palette = 'custom';
            this.saveSettings();
            this.loadSettingsToUI();
            this.applyAppearance();
        });

        document.querySelectorAll('input[name="word-length"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.wordLength = parseInt(e.target.value);
                this.saveSettings();
                if (this.settings.practiceMode === 'words') this.nextKana();
            });
        });

        this.fontSelect.addEventListener('change', (e) => {
            this.settings.font = e.target.value;
            this.saveSettings();
            this.applyAppearance();
        });

        this.practiceAudio.addEventListener('change', (e) => {
            this.settings.practiceAudio = e.target.checked;
            this.saveSettings();
        });

        if (this.practiceVoiceFemaleBtn) {
            this.practiceVoiceFemaleBtn.addEventListener('click', () => this.setVoice('practice', 'f'));
        }
        if (this.practiceVoiceMaleBtn) {
            this.practiceVoiceMaleBtn.addEventListener('click', () => this.setVoice('practice', 'm'));
        }
        if (this.tableVoiceFemaleBtn) {
            this.tableVoiceFemaleBtn.addEventListener('click', () => this.setVoice('table', 'f'));
        }
        if (this.tableVoiceMaleBtn) {
            this.tableVoiceMaleBtn.addEventListener('click', () => this.setVoice('table', 'm'));
        }

        // Если выбрана «Как в телефоне», следим за сменой темы системы
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.settings.theme === 'system') this.applyAppearance();
            });
        }

        this.updateInputPlaceholder();
    }

    applyAppearance() {
        const root = document.documentElement;
        // «system» следует теме телефона; в CSS есть только light и dark
        const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.dataset.theme = this.settings.theme === 'system'
            ? (systemDark ? 'dark' : 'light')
            : this.settings.theme;

        // Сбрасываем прошлую пользовательскую палитру
        root.style.removeProperty('--c1');
        root.style.removeProperty('--c2');

        if (this.settings.palette === 'custom') {
            delete root.dataset.palette;
            const c = this.settings.customColor;
            root.style.setProperty('--c1', c);
            root.style.setProperty('--c2', `color-mix(in srgb, ${c} 60%, #000)`);
        } else if (this.settings.palette === 'violet') {
            delete root.dataset.palette; // фиолетовая — палитра по умолчанию из :root
        } else {
            root.dataset.palette = this.settings.palette;
        }

        const stack = this.fontStacks[this.settings.font] || this.fontStacks['zen-maru-gothic'];
        root.style.setProperty('--kana-font', stack);

        const swatch = document.getElementById('custom-swatch');
        if (swatch) {
            swatch.style.setProperty('--sw1', this.settings.customColor);
            swatch.style.setProperty('--sw2', `color-mix(in srgb, ${this.settings.customColor} 60%, #000)`);
        }
    }

    // Номера групп, которые показываются на вкладке
    groupsForTab(tab) {
        if (tab === 'yoon') return Array.from({length: 11}, (_, i) => i + 17);
        return Array.from({length: 16}, (_, i) => i + 1);
    }

    // Строка карточки по гласной: у «ん» нет гласной, ставим в ряд «o»
    vowelIndex(romaji) {
        if (romaji === 'n') return VOWELS.indexOf('o');
        return VOWELS.indexOf(romaji.slice(-1));
    }

    renderGroupsGrid() {
        this.groupsGrid.innerHTML = '';
        const tab = this.groupScript;
        const selected = this.settings.selectedGroups[tab] || [];
        const yoon = tab === 'yoon';

        document.querySelectorAll('[data-group-script]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.groupScript === tab);
        });
        this.selectBasicGroupsBtn.style.display = yoon ? 'none' : '';
        this.groupsGrid.classList.toggle('yoon-grid', yoon);

        this.groupsForTab(tab).forEach(i => {
            const card = document.createElement('div');
            card.className = 'group-card' + (selected.includes(i) ? ' selected' : '');

            // Пять строк по гласным: символ стоит в строке своей гласной
            const slots = VOWELS.map(() => {
                const slot = document.createElement('div');
                slot.className = 'group-slot' + (yoon ? ' slot-tall' : '');
                return slot;
            });

            const entries = yoon
                ? KANA_DATA.hiragana[i].map((h, k) => ({ kana: h.kana, alt: KANA_DATA.katakana[i][k].kana, romaji: h.romaji }))
                : KANA_DATA[tab][i].map(c => ({ kana: c.kana, romaji: c.romaji }));

            entries.forEach(e => {
                const slot = slots[this.vowelIndex(e.romaji)];
                const kana = document.createElement('div');
                kana.className = 'group-kana';
                kana.textContent = e.kana;
                slot.appendChild(kana);
                if (e.alt) {
                    const alt = document.createElement('div');
                    alt.className = 'group-kana group-kana-alt';
                    alt.textContent = e.alt;
                    slot.appendChild(alt);
                }
                const romaji = document.createElement('div');
                romaji.className = 'group-romaji';
                romaji.textContent = e.romaji;
                slot.appendChild(romaji);
            });

            slots.forEach(s => card.appendChild(s));
            card.addEventListener('click', () => this.toggleGroup(i));
            this.groupsGrid.appendChild(card);
        });
    }

    toggleGroup(group) {
        const list = this.settings.selectedGroups[this.groupScript];
        const idx = list.indexOf(group);
        if (idx >= 0) {
            list.splice(idx, 1);
        } else {
            list.push(group);
        }
        this.ensureVowelFallback(this.groupScript);
        this.saveSettings();
        this.renderGroupsGrid();
        this.nextKana();
    }

    // Если на вкладке не осталось ни одной группы, выбираем только あ (a, i, u, e, o).
    // У ёон нет группы с гласными, поэтому там ничего не делаем.
    ensureVowelFallback(tab) {
        if (tab === 'yoon') return;
        const list = this.settings.selectedGroups[tab];
        if (list.length === 0) list.push(1);
    }

    switchView(viewName) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === viewName);
        });

        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        switch(viewName) {
            case 'practice':
                this.practiceView.classList.add('active');
                this.answerInput.focus();
                break;
            case 'table':
                this.tableView.classList.add('active');
                this.renderKanaTable('hiragana');
                break;
            case 'settings':
                this.settingsView.classList.add('active');
                this.loadSettingsToUI();
                break;
        }
    }

    getKanaPool() {
        const pool = [];
        const useHiragana = this.settings.scriptMode === 'both' || this.settings.scriptMode === 'hiragana';
        const useKatakana = this.settings.scriptMode === 'both' || this.settings.scriptMode === 'katakana';

        const scripts = [];
        if (useHiragana) scripts.push('hiragana');
        if (useKatakana) scripts.push('katakana');

        scripts.forEach(s => {
            (this.settings.selectedGroups[s] || []).filter(g => g <= 16).forEach(g => pool.push(...KANA_DATA[s][g]));
        });
        // Ёон: выбранные группы берутся для тех же алфавитов, что и основные
        (this.settings.selectedGroups.yoon || []).filter(g => g >= 17 && g <= 27).forEach(g => {
            scripts.forEach(s => pool.push(...KANA_DATA[s][g]));
        });

        return pool;
    }

    nextKana() {
        if (this.settings.practiceMode === 'words') {
            this.currentKana = this.pickNext(this.getWordPool(), 'words-' + this.settings.wordLength);
            this.kanaDisplay.textContent = this.currentKana.kana;
            // Длинные слова показываем мельче, чтобы они вмещались в одну строку
            this.kanaDisplay.classList.toggle('long-word', this.currentKana.kana.length >= 5);
            this.wordMeaning.textContent = this.currentKana.meaning || '';
            this.wordMeaning.classList.remove('hidden');
            this.wordNote.classList.remove('hidden');
        } else {
            const pool = this.getKanaPool();

            if (pool.length === 0) {
                this.showFeedback('Выберите хотя бы одну группу символов в настройках!', 'error');
                return;
            }

            this.currentKana = this.pickNext(pool, pool.map(p => p.kana).join(''));
            this.wordMeaning.classList.add('hidden');
            this.wordNote.classList.add('hidden');

            this.kanaDisplay.classList.remove('long-word');
            if (this.settings.practiceMode === 'kana') {
                this.kanaDisplay.textContent = this.currentKana.kana;
            } else {
                this.kanaDisplay.textContent = this.currentKana.romaji;
            }
        }

        this.answerInput.value = '';
        this.answerInput.disabled = false;
        this.submitBtn.disabled = false;
        this.feedback.classList.add('hidden');
        this.answerInput.focus();
    }

    // Слова выбранной длины (6 = 6 и более). Если слов нет, берём все.
    getWordPool() {
        const len = this.settings.wordLength;
        const pool = WORDS.filter(w => len >= 6 ? w.kana.length >= 6 : w.kana.length === len);
        return pool.length > 0 ? pool : WORDS;
    }

    // Выдаёт элементы из перемешанной очереди, пока все не будут показаны.
    // Так символы не повторяются до полного круга, а сразу после конца круга
    // не выпадает тот же символ, что был последним.
    pickNext(pool, key) {
        if (this.deckKey !== key || this.deck.length === 0) {
            this.deckKey = key;
            this.deck = [...pool];
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
            const last = this.deck.length - 1;
            if (last > 0 && this.deck[last] === this.currentKana) {
                [this.deck[0], this.deck[last]] = [this.deck[last], this.deck[0]];
            }
        }
        return this.deck.pop();
    }

    checkAnswer() {
        if (!this.currentKana) return;

        const userAnswer = this.answerInput.value.trim().toLowerCase();
        let isCorrect = false;

        if (this.settings.practiceMode === 'words' || this.settings.practiceMode === 'kana') {
            const alternatives = this.getRomajiAlternatives(this.currentKana.romaji);
            isCorrect = alternatives.includes(userAnswer);
        } else {
            isCorrect = userAnswer === this.currentKana.kana;
        }

        this.stats.total++;

        if (isCorrect) {
            this.stats.correct++;
            this.updateStats();
            if (this.settings.practiceAudio) this.playKana(this.currentKana.romaji);
            this.nextKana();
        } else {
            let errorMsg = `Правильный ответ: ${this.currentKana.romaji}`;
            if (this.settings.practiceAudio) this.playKana(this.currentKana.romaji);
            if (this.settings.practiceMode === 'romaji') {
                errorMsg = `Правильный ответ: ${this.currentKana.kana} (${this.currentKana.romaji})`;
            }
            if (this.settings.practiceMode === 'words' && this.currentKana.meaning) {
                errorMsg;
            }

            this.showFeedback(errorMsg, 'error');
            this.answerInput.disabled = true;
            this.submitBtn.disabled = true;
            this.updateStats();

            setTimeout(() => this.nextKana(), 2000);
        }
    }

    getRomajiAlternatives(romaji) {
        const alternatives = [romaji];
        const variants = {
            'shi': ['si'],
            'chi': ['ti'],
            'tsu': ['tu'],
            'fu': ['hu'],
            'ji': ['zi', 'di'],
            'zu': ['du'],
            'wo': ['o']
        };

        if (variants[romaji]) {
            alternatives.push(...variants[romaji]);
        }

        return alternatives;
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
        this.feedback.classList.remove('hidden');
    }

    updateStats() {
        this.correctCount.textContent = `Правильно: ${this.stats.correct}`;
        this.totalCount.textContent = `Всего: ${this.stats.total}`;
        const accuracyPercent = this.stats.total > 0 ? Math.round((this.stats.correct / this.stats.total) * 100) : 0;
        this.accuracy.textContent = `Точность: ${accuracyPercent}%`;
    }

    resetStats() {
        if (confirm('Вы уверены, что хотите сбросить статистику?')) {
            this.stats = { correct: 0, total: 0 };
            this.updateStats();
        }
    }

    // Таблица ёон: строки — согласные (ky, sh, ch…), столбцы — ya/yu/yo
    renderYoonTable() {
        const cols = ['ya', 'yu', 'yo'];
        const isKata = this.yoonScript === 'katakana';
        const toggleLabel = isKata ? 'Катакана' : 'Хирагана';
        let html = `<table class="yoon-table"><tbody><tr><th><button id="yoon-toggle" class="btn btn-secondary yoon-toggle">${toggleLabel}</button></th>`
            + cols.map(c => `<th>${c}</th>`).join('') + '</tr>';

        for (let g = 17; g <= 27; g++) {
            const hira = KANA_DATA.hiragana[g];
            const kata = KANA_DATA.katakana[g];
            const label = hira[0].romaji.slice(0, -1); // «kya» → «ky», «ja» → «j»
            html += `<tr><th>${label}</th>`;
            hira.forEach((h, k) => {
                const shown = isKata ? kata[k].kana : h.kana;
                html += `<td class="yoon-cell" data-kana="${shown}" data-script="${isKata ? 'katakana' : 'hiragana'}">${shown}</td>`;
            });
            html += '</tr>';
        }

        html += '</tbody></table>';
        const container = document.getElementById('kana-table');
        container.innerHTML = html;

        document.getElementById('yoon-toggle').addEventListener('click', () => {
            this.yoonScript = isKata ? 'hiragana' : 'katakana';
            this.renderYoonTable();
        });
    }

    renderKanaTable(script) {
        if (script === 'yoon') {
            this.renderYoonTable();
            return;
        }
        const allRows = KANA_TABLES[script];
        const table = allRows.slice(0, -1); // «ん» выводится отдельно: это не слог с гласной
        const extraRow = allRows[allRows.length - 1];
        const tableContainer = document.getElementById('kana-table');
        let html = '<table><tbody>';

        table.forEach((row, rowIndex) => {
            html += '<tr>';
            row.forEach((cell, cellIndex) => {
                if (rowIndex === 0 || cellIndex === 0) {
                    html += `<th>${cell}</th>`;
                } else if (cell) {
                    html += `<td data-kana="${cell}" data-script="${script}">${cell}</td>`;
                } else {
                    html += '<td></td>';
                }
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        const extra = `<div class="kana-extra"><table><tbody><tr><th>${extraRow[0]}</th><td data-kana="${extraRow[1]}" data-script="${script}">${extraRow[1]}</td></tr></tbody></table></div>`;
        tableContainer.innerHTML = html + extra;
    }

    buildKanaMap() {
        const map = {};
        ['hiragana', 'katakana'].forEach(script => {
            map[script] = {};
            Object.values(KANA_DATA[script]).forEach(list => {
                list.forEach(e => { map[script][e.kana] = e.romaji; });
            });
        });
        return map;
    }

    // Звук из папки audio/: для любой каны (хирагана, катакана, ёон) — h-<ромадзи>.mp3
    playKanaTable(kana, script) {
        const romaji = this.kanaMap[script] && this.kanaMap[script][kana];
        if (!romaji) return;
        this.playKana(romaji, this.settings.tableVoice);
    }

    playKana(romaji, voice = this.settings.practiceVoice) {
        new Audio(`audio/${voice}/h-${romaji}.mp3`).play().catch(() => {});
    }

    updateInputPlaceholder() {
        if (this.settings.practiceMode === 'kana' || this.settings.practiceMode === 'words') {
            this.answerInput.placeholder = 'Введите ромадзи латиницей (пример: a)';
        } else {
            this.answerInput.placeholder = 'Введите кану (например: あ)';
        }
    }

    setVoice(target, voice) {
        if (target === 'practice') {
            this.settings.practiceVoice = voice;
        } else {
            this.settings.tableVoice = voice;
        }
        this.saveSettings();
        this.updateVoiceButtons();
    }

    updateVoiceButtons() {
        const applyBtnState = (femaleBtn, maleBtn, currentVoice) => {
            if (!femaleBtn || !maleBtn) return;
            const isFemale = currentVoice === 'f';

            femaleBtn.classList.toggle('active', isFemale);
            femaleBtn.classList.toggle('btn-primary', isFemale);
            femaleBtn.classList.toggle('btn-secondary', !isFemale);

            maleBtn.classList.toggle('active', !isFemale);
            maleBtn.classList.toggle('btn-primary', !isFemale);
            maleBtn.classList.toggle('btn-secondary', isFemale);
        };

        applyBtnState(this.practiceVoiceFemaleBtn, this.practiceVoiceMaleBtn, this.settings.practiceVoice);
        applyBtnState(this.tableVoiceFemaleBtn, this.tableVoiceMaleBtn, this.settings.tableVoice);
    }

    loadSettingsToUI() {
        document.querySelector(`input[name="script-mode"][value="${this.settings.scriptMode}"]`).checked = true;
        document.querySelector(`input[name="practice-mode"][value="${this.settings.practiceMode}"]`).checked = true;
        document.querySelector(`input[name="word-length"][value="${this.settings.wordLength}"]`).checked = true;
        document.querySelector(`input[name="theme"][value="${this.settings.theme}"]`).checked = true;
        document.querySelector(`input[name="palette"][value="${this.settings.palette}"]`).checked = true;
        document.getElementById('custom-color').value = this.settings.customColor;
        this.fontSelect.value = this.settings.font;
        this.practiceAudio.checked = this.settings.practiceAudio;
        this.updateVoiceButtons();
    }

    saveSettings() {
        localStorage.setItem('kanaSettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('kanaSettings');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.settings = { ...this.settings, ...parsed };
            const sg = parsed.selectedGroups;
            if (Array.isArray(sg)) {
                // Миграция: раньше один общий список для обоих алфавитов
                this.settings.selectedGroups = {
                    hiragana: sg.filter(g => g <= 16),
                    katakana: sg.filter(g => g <= 16),
                    yoon: sg.filter(g => g >= 17)
                };
            } else if (sg) {
                this.settings.selectedGroups = { hiragana: [], katakana: [], yoon: [], ...sg };
            }
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new KanaApp();
});
