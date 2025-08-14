        let puzzle = [];
        let moves = 0;
        let emptyIndex = 15;

        // Initialize the puzzle
        function initPuzzle() {
            puzzle = Array.from({length: 16}, (_, i) => i === 15 ? 0 : i + 1);
            moves = 0;
            emptyIndex = 15;
            updateDisplay();
            document.getElementById('winMessage').classList.remove('show');
        }

        // Create the visual grid
        function updateDisplay() {
            const grid = document.getElementById('puzzleGrid');
            grid.innerHTML = '';
            
            puzzle.forEach((num, index) => {
                const tile = document.createElement('button');
                tile.className = 'puzzle-tile';
                
                if (num === 0) {
                    tile.classList.add('empty');
                    tile.textContent = '';
                } else {
                    tile.textContent = num;
                    tile.onclick = () => moveTile(index);
                }
                
                grid.appendChild(tile);
            });
            
            document.getElementById('moveCount').textContent = moves;
        }

        // Check if a move is valid
        function canMove(index) {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const emptyRow = Math.floor(emptyIndex / 4);
            const emptyCol = emptyIndex % 4;
            
            return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
                   (Math.abs(col - emptyCol) === 1 && row === emptyRow);
        }

        // Move a tile
        function moveTile(index) {
            if (canMove(index)) {
                // Swap tile with empty space
                puzzle[emptyIndex] = puzzle[index];
                puzzle[index] = 0;
                emptyIndex = index;
                moves++;
                
                updateDisplay();
                
                if (checkWin()) {
                    setTimeout(() => {
                        document.getElementById('finalMoves').textContent = moves;
                        document.getElementById('winMessage').classList.add('show');
                    }, 300);
                }
            }
        }

        // Check if puzzle is solved
        function checkWin() {
            for (let i = 0; i < 15; i++) {
                if (puzzle[i] !== i + 1) {
                    return false;
                }
            }
            return puzzle[15] === 0;
        }

        // Shuffle the puzzle
        function shufflePuzzle() {
            // Start with solved state
            puzzle = Array.from({length: 16}, (_, i) => i === 15 ? 0 : i + 1);
            emptyIndex = 15;
            
            // Perform random valid moves to shuffle
            for (let i = 0; i < 1000; i++) {
                const possibleMoves = [];
                
                // Find all valid moves
                for (let j = 0; j < 16; j++) {
                    if (canMove(j)) {
                        possibleMoves.push(j);
                    }
                }
                
                // Make a random valid move
                if (possibleMoves.length > 0) {
                    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                    puzzle[emptyIndex] = puzzle[randomMove];
                    puzzle[randomMove] = 0;
                    emptyIndex = randomMove;
                }
            }
            
            moves = 0;
            updateDisplay();
            document.getElementById('winMessage').classList.remove('show');
        }

        // Initialize the game
        initPuzzle();
        shufflePuzzle();

        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'968c62feb6e3a925',t:'MTc1NDEyNTI0NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();