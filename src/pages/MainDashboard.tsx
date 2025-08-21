export const MainDashboard = () => {
    return (
        <div>        
         <h1>Welcome back, Sunder</h1>
         <div>
            <div className="section">
                <h2>To-Do</h2>
                <span>20 June</span>
                <button>Add Task</button>
                <div className="todo-card">
                    <div>
                        <div>
                            <h3>Attend Nischal’s Birthday Party</h3>
                            <p>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</p>
                        </div>
                        <div>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div>
                        <p>Priority: <span>Moderate</span></p>
                        <p>Status: <span>Not Started</span></p>
                        <p>Created on: 20/06/2023</p>
                    </div>
                </div>
                 <div className="todo-card">
                    <div>
                        <div>
                            <h3>Attend Nischal’s Birthday Party</h3>
                            <p>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</p>
                        </div>
                        <div>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div>
                        <p>Priority: <span>Moderate</span></p>
                        <p>Status: <span>Not Started</span></p>
                        <p>Created on: 20/06/2023</p>
                    </div>
                </div>
            </div>
            <div className="section">
                <h2>Task Status</h2>
            </div>
            <div className="section">
                <h2>Completed Task</h2>
            </div>
         </div>
        </div>
    )
}