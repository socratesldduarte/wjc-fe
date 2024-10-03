import './App.css';
import Jug from './Jug';
import {useState} from "react";

function App() {
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');

    const [apiResponse, setApiResponse] = useState(null);

    const [showJugs, setShowJugs] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const [showError, setShowError] = useState(false);
    const [solution, setSolution] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            x_capacity: parseInt(x, 10),
            y_capacity: parseInt(y, 10),
            z_amount_wanted: parseInt(z, 10),
        };

        try {
            const response = await fetch('http:///water-jug-challenge.test/api/v1/wjc/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error while requesting evaluation');
            }

            const jsonResponse = await response.json();

            setApiResponse(jsonResponse);
            if (Array.isArray(jsonResponse?.solution)) {
                setSolution(jsonResponse.solution);
                setShowError(false);
                setShowResponse(true);
            } else {
                setShowResponse(false);
                setShowError(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Enter values of X, Y e Z</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Jug X Capacity:
                        <input
                            type="number"
                            value={x}
                            onChange={(e) => setX(e.target.value)}  // Atualiza o valor de X
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Jug Y Capacity:
                        <input
                            type="number"
                            value={y}
                            onChange={(e) => setY(e.target.value)}  // Atualiza o valor de Y
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Target Volume (Z):
                        <input
                            type="number"
                            value={z}
                            onChange={(e) => setZ(e.target.value)}  // Atualiza o valor de Z
                        />
                    </label>
                </div>

                <button type="submit">Process</button>
            </form>

            {showJugs && (
                <div>
                    <h1>Jugs</h1>
                    <div className="jug-container">
                        <p>X</p>
                        <Jug level={0}/>
                        <p>Y</p>
                        <Jug level={0}/>
                    </div>
                </div>
            )}

            {showResponse && (
                <div>
                    <h1>Response</h1>
                    <table border={1} cellPadding={4} cellSpacing={0} align={"center"}>
                        <tr>
                            <td>
                                <strong>Bucket x</strong>
                            </td>
                            <td>
                                <strong>Bucket y</strong>
                            </td>
                            <td>
                                <strong>Explanation</strong>
                            </td>
                        </tr>
                        {solution.map((step, index) => (
                        <tr>
                            <td>
                                {step.bucketX}
                            </td>
                            <td>
                                {step.bucketY}
                            </td>
                            <td>
                                {step.action}
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
            )}

            {showError && (
                <div>
                    <h1>Response</h1>
                    <pre>{apiResponse.message}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
