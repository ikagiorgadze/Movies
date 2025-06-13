const Movie = require('./models/movie.model');

const movieSeedData = [
    {
        title: 'Alien',
        director: 'Ridley Scott',
        releaseYear: 1979,
        description:
            'The crew of the commercial spaceship Nostromo is awakened from their cryo-sleep capsules to investigate a distress call from an alien vessel. The terror begins when the crew encounters a nest of eggs inside the alien ship.',
        posterUrl: 'https://i.ibb.co/v5X02jS/alienwebp.webp',
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
        releaseYear: 1985,
        description:
            'A high-school student, Marty McFly, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his eccentric scientist friend, Doc Brown.',
        posterUrl: 'https://i.ibb.co/jkLQsg1H/backtofuture.webp',
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        releaseYear: 2008,
        description:
            'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        posterUrl: 'https://i.ibb.co/XfsHKVRJ/darkknight.webp',
    },
    {
        title: 'Goodfellas',
        director: 'Martin Scorsese',
        releaseYear: 1990,
        description:
            'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
        posterUrl: 'https://i.ibb.co/KpvkRnb5/goodfellas.webp',
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan',
        releaseYear: 2014,
        description:
            'In a future where Earth is becoming uninhabitable, a former NASA pilot leads a team of researchers on a perilous mission through a wormhole near Saturn in search of a new planet for humanity.',
        posterUrl: 'https://i.ibb.co/VYgRYnJ1/interstellar.webp',
    },
    {
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
        releaseYear: 1993,
        description:
            "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        posterUrl: 'https://i.ibb.co/JjXMRW1Q/jurassicpark.webp',
    },
    {
        title: 'Mission: Impossible – Ghost Protocol',
        director: 'Brad Bird',
        releaseYear: 2011,
        description:
            "The IMF is shut down when it's implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue to clear their organization's name.",
        posterUrl:
            'https://i.ibb.co/4wSpkjWz/mission-impossible-ghost-protocol.webp',
    },
    {
        title: 'The Matrix',
        director: 'The Wachowskis',
        releaseYear: 1999,
        description:
            'A computer hacker named Neo discovers that his everyday world is a computer-generated simulation of a dystopian future. He joins a rebellion of humans who are fighting intelligent machines.',
        posterUrl: 'https://i.ibb.co/wFD720gp/matrix.webp',
    },
    {
        title: 'Monsters vs. Aliens',
        director: 'Conrad Vernon, Rob Letterman',
        releaseYear: 2009,
        description:
            'A woman is transformed into a giant after she is struck by a meteorite on her wedding day and becomes part of a team of monsters sent by the U.S. government to defeat an alien mastermind.',
        posterUrl: 'https://i.ibb.co/YM96krp/monstersvsaliens.webp',
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        releaseYear: 1994,
        description:
            'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        posterUrl: 'https://i.ibb.co/zh6q6sk1/pulpfiction.webp',
    },
    {
        title: 'Teenage Mutant Ninja Turtles',
        director: 'Steve Barron',
        releaseYear: 1990,
        description:
            'Four martial-arts-loving turtles emerge from the sewers of New York City to battle the evil Shredder and his criminal organization, the Foot Clan.',
        posterUrl: 'https://i.ibb.co/4ZVDhKBw/TMNT.webp',
    },
];

const seedDatabase = async () => {
    try {
        const movieCount = await Movie.countDocuments();

        if (movieCount === 0) {
            console.log('No movies found, seeding the database');
            await Movie.insertMany(movieSeedData);
            console.log('Database seeding completed');
        }
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

module.exports = seedDatabase;
