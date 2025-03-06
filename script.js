document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksList = document.getElementById('tasks-list');
    const showBulkEditBtn = document.getElementById('show-bulk-edit-btn');
    const bulkTasksInput = document.getElementById('bulk-tasks-input');
    const updateBulkBtn = document.getElementById('update-bulk-btn');
    const cancelBulkBtn = document.getElementById('cancel-bulk-btn');
    const singleEditView = document.getElementById('single-edit-view');
    const bulkEditView = document.getElementById('bulk-edit-view');
    const spinBtn = document.getElementById('spin-btn');
    const innerWheel = document.getElementById('inner-wheel');
    const outsideCircle = document.getElementById('outside-circle');
    const selectedTaskDisplay = document.getElementById('selected-task-display');
    const selectedTaskText = document.getElementById('selected-task-text');

    // Default tasks
    let tasks = [
        "Mow the lawn",
        "Fix the leaky faucet",
        "Clean the gutters",
        "Paint the bedroom",
        "Organize the garage",
        "Fix the fence",
        "Hang the pictures",
        "Replace light bulbs",
        "Trim the hedges",
        "Install new shelves",
        "Clean the windows",
        "Fix the squeaky door"
    ];

    // Colors for the wheel segments
    const colors = [
        "#FFC107", // Honey yellow
        "#FFD54F", // Lighter honey
        "#FFA000", // Darker honey
        "#FFECB3"  // Very light honey
    ];

    // Wheel state
    let rotation = 0;
    let spinning = false;
    let selectedTask = "";

    // Initialize the wheel
    renderWheel();

    // Event listeners
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    addTaskBtn.addEventListener('click', addTask);
    showBulkEditBtn.addEventListener('click', showBulkEdit);
    updateBulkBtn.addEventListener('click', handleBulkUpdate);
    cancelBulkBtn.addEventListener('click', hideBulkEdit);
    spinBtn.addEventListener('click', spinWheel);

    // Functions
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            newTaskInput.value = "";
            renderTasksList();
            renderWheel();
        }
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasksList();
        renderWheel();
    }

    function renderTasksList() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            
            const taskText = document.createElement('span');
            taskText.textContent = task;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeTask(index));
            
            taskItem.appendChild(taskText);
            taskItem.appendChild(removeBtn);
            tasksList.appendChild(taskItem);
        });
    }

    function showBulkEdit() {
        bulkTasksInput.value = tasks.join('\n');
        singleEditView.style.display = 'none';
        bulkEditView.style.display = 'block';
    }

    function hideBulkEdit() {
        singleEditView.style.display = 'block';
        bulkEditView.style.display = 'none';
    }

    function handleBulkUpdate() {
        const newTaskList = bulkTasksInput.value
            .split('\n')
            .map(task => task.trim())
            .filter(task => task !== "");
        
        if (newTaskList.length > 0) {
            tasks = newTaskList;
            renderTasksList();
            renderWheel();
            hideBulkEdit();
        }
    }

    function renderWheel() {
        // Clear existing elements
        outsideCircle.innerHTML = '';
        innerWheel.innerHTML = '<div class="center-button"></div>';
        
        const segmentAngle = 360 / tasks.length;
        
        // Add bumblebees around the wheel
        for (let i = 0; i < 8; i++) {
            const bee = document.createElement('div');
            bee.className = 'emoji';
            bee.textContent = '🐝';
            bee.style.top = `${48 + 45 * Math.sin(i * Math.PI / 4)}%`;
            bee.style.left = `${48 + 45 * Math.cos(i * Math.PI / 4)}%`;
            outsideCircle.appendChild(bee);
        }
        
        // Add honey jars around the wheel
        for (let i = 0; i < 8; i++) {
            const honey = document.createElement('div');
            honey.className = 'emoji';
            honey.textContent = '🍯';
            honey.style.top = `${48 + 45 * Math.sin((i * Math.PI / 4) + Math.PI/8)}%`;
            honey.style.left = `${48 + 45 * Math.cos((i * Math.PI / 4) + Math.PI/8)}%`;
            outsideCircle.appendChild(honey);
        }
        
        // Add task labels
        tasks.forEach((task, index) => {
            // Create label
            const taskLabel = document.createElement('div');
            taskLabel.className = 'task-label';
            taskLabel.style.transform = `rotate(${index * segmentAngle}deg)`;
            
            const labelContent = document.createElement('div');
            labelContent.className = 'task-label-content';
            labelContent.textContent = task;
            
            // Add task index as data attribute for debugging
            labelContent.dataset.taskIndex = index;
            
            taskLabel.appendChild(labelContent);
            outsideCircle.appendChild(taskLabel);
            
            // Create inner wheel segment
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.backgroundColor = colors[index % colors.length];
            segment.style.transform = `rotate(${index * segmentAngle}deg)`;
            // Add task index as data attribute for debugging
            segment.dataset.taskIndex = index;
            innerWheel.appendChild(segment);
        });
    }

    function spinWheel() {
        if (spinning) return;
        
        spinning = true;
        selectedTaskDisplay.style.display = 'none';
        spinBtn.disabled = true;
        spinBtn.textContent = 'Spinning...';
        
        // Random number of rotations (3-10) plus a random angle
        const spinDegrees = 1080 + Math.floor(Math.random() * 1800);
        
        // Update rotation and animate
        rotation += spinDegrees;
        innerWheel.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // Calculate which task is selected after spinning
        setTimeout(() => {
            const normalizedRotation = rotation % 360;
            // Fix the calculation - use correct task index based on wheel position
            // The wheel spins clockwise but we need the task in the pointer's position
            const selectedIndex = Math.floor((360 - (normalizedRotation % 360)) / segmentAngle) % tasks.length;
            
            // Add debug log to help troubleshooting
            console.log('Spin completed', {
                rotation,
                normalizedRotation,
                segmentAngle,
                selectedIndex,
                tasksLength: tasks.length,
                selectedTask: tasks[selectedIndex]
            });
            
            // Ensure we have a valid index
            if (selectedIndex >= 0 && selectedIndex < tasks.length) {
                selectedTask = tasks[selectedIndex];
                selectedTaskText.textContent = selectedTask;
                selectedTaskDisplay.style.display = 'block';
            } else {
                // Fallback in case of calculation error
                selectedTask = tasks[0];
                selectedTaskText.textContent = selectedTask + ' (fallback)';
                selectedTaskDisplay.style.display = 'block';
            }
            
            spinning = false;
            spinBtn.disabled = false;
            spinBtn.textContent = 'SPIN!';
        }, 3100); // Slightly longer than the CSS transition duration to ensure animation is complete
    }

    // Initial render
    renderTasksList();
    
    // Debug function to verify the wheel is working properly
    window.debugWheel = function() {
        console.log({
            tasks,
            segmentAngle: 360 / tasks.length,
            rotation,
            spinning
        });
    };
});
