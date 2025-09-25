import { Link } from 'react-router-dom';
function Home() {
    return (
        <>
            <section>
                <h2>Wizard Manager</h2>
                <p>Welcome! This is the official site of Hogwarts School, managed by Steve Cooperated.</p>

                <p>It lists every attendee. Let's have a look and find your name.</p>

                <p>
                    This software is a wizard and customer management service for Hogwarts. <br />Administrators can add, update, search, and manage all wizards enrolled at the school.
                </p>
                <p>
                    <Link to="/list">Check out the list here</Link>
                </p>
            </section>
        </>
    );
}

export default Home;