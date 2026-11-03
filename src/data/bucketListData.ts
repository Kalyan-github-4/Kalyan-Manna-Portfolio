import {
    AirplaneTakeoff,
    AirplaneTilt,
    Barbell,
    Books,
    Buildings,
    Car,
    ChalkboardTeacher,
    Compass,
    CurrencyInr,
    GitPullRequest,
    GlobeHemisphereEast,
    HandFist,
    HandHeart,
    Heartbeat,
    HouseLine,
    MapTrifold,
    MicrophoneStage,
    Motorcycle,
    PersonArmsSpread,
    Planet,
    Smiley,
    SoccerBall,
    Suitcase,
    Sun,
    Tent,
    Translate,
    Trophy,
    UsersFour,
    UsersThree,
    Vault,
    type Icon,
} from "@phosphor-icons/react"

export interface BucketItem {
    title: string
    /** Additional context or motivation behind the goal */
    note?: string
    /** When it was completed, e.g. "Oct 2026" */
    doneOn?: string
    /** Doodle drawn beside the goal */
    icon: Icon
    /** Proof once it's done, inspiration until then; pinned in the margin. */
    photo?: { src: string; alt: string }
}

export interface BucketSection {
    title: string
    subtitle: string
    items: BucketItem[]
}

export const bucketSections: BucketSection[] = [
    {
        title: "Build",
        subtitle: "career & creation",
        items: [
            {
                title: "Win a hackathon",
                note: "Kolkata HackDays at Hacktoberfest x JIS.",
                doneOn: "Oct 2026",
                icon: Trophy,
                photo: {
                    src: "/hacktoberfest-x-jis/hacktoberfest-img-1.webp",
                    alt: "Our team at Hacktoberfest x JIS",
                },
            },
            {
                title: "Organize a hackathon",
                icon: UsersThree,
                photo: { src: "/bucket-list/organize-hackathon.webp", alt: "A packed room of people coding at long rows of desks" },
            },
            {
                title: "Speak at a tech conference",
                icon: MicrophoneStage,
                photo: { src: "/bucket-list/speak-conference.webp", alt: "A microphone in front of a conference audience" },
            },
            {
                title: "Make my first meaningful open-source contribution",
                icon: GitPullRequest,
                photo: { src: "/bucket-list/open-source.webp", alt: "Code open in an editor on a laptop" },
            },
            {
                title: "Get selected for Google Summer of Code",
                icon: Sun,
                photo: { src: "/bucket-list/gsoc.webp", alt: "A laptop with code on screen beside a plant on a bright desk" },
            },
            {
                title: "Build an application with 10,000+ active users",
                icon: UsersFour,
                photo: { src: "/bucket-list/active-users.webp", alt: "An analytics dashboard charting weekly users" },
            },
            {
                title: "Ship a product that genuinely helps people",
                icon: HandHeart,
                photo: { src: "/bucket-list/help-people.webp", alt: "A team working together in a bright loft office" },
            },
            {
                title: "Earn ₹1 crore in a year",
                note: "Not for the number, but for the freedom it represents.",
                icon: CurrencyInr,
                photo: { src: "/bucket-list/one-crore.webp", alt: "A sapling growing out of a pile of coins" },
            },
            {
                title: "Build a sustainable company",
                icon: Buildings,
                photo: { src: "/bucket-list/company.webp", alt: "An empty, light-filled office with a long meeting table" },
            },
            {
                title: "Mentor someone starting their development journey",
                icon: ChalkboardTeacher,
                photo: { src: "/bucket-list/mentor.webp", alt: "Three people laughing together over laptops" },
            },
        ],
    },
    {
        title: "Grind",
        subtitle: "health & personal growth",
        items: [
            {
                title: "Do 100 consecutive push-ups in a single set",
                icon: HandFist,
                photo: { src: "/bucket-list/push-ups.webp", alt: "A man doing push-ups in a gym" },
            },
            {
                title: "Do 50 consecutive pull-ups in a single set",
                icon: PersonArmsSpread,
                photo: { src: "/bucket-list/pull-ups.webp", alt: "Someone hanging from a pull-up bar, black and white" },
            },
            {
                title: "Lift twice my body weight",
                icon: Barbell,
                photo: { src: "/bucket-list/lift.webp", alt: "Rows of dumbbells on a rack in a gym" },
            },
            {
                title: "Build my dream physique naturally",
                icon: Heartbeat,
                photo: { src: "/bucket-list/physique.webp", alt: "A hand gripping a dumbbell on the rack" },
            },
            {
                title: "Speak five languages fluently",
                note: "Bengali and Hindi are my starting point. Working towards English and Japanese, with one more language to discover.",
                icon: Translate,
                photo: { src: "/bucket-list/languages.webp", alt: "A pencil-shaped sign that reads Love to Learn" },
            },
            {
                title: "Read 12 books in a year",
                icon: Books,
                photo: { src: "/bucket-list/books.webp", alt: "A tall stack of books" },
            },
            {
                title: "Become someone my younger self would be proud of",
                note: "Probably the most important achievement on this entire list.",
                icon: Smiley,
                photo: { src: "/bucket-list/younger-self.webp", alt: "An empty road running between red canyon walls" },
            },
        ],
    },
    {
        title: "Wander",
        subtitle: "travel & adventure",
        items: [
            {
                title: "Explore 5 states in India",
                note: "One down: Rajasthan (visited Jaipur).",
                icon: MapTrifold,
                photo: { src: "/acehack-5-0/ah-14.webp", alt: "Looking out over Jantar Mantar in Jaipur" },
            },
            {
                title: "Travel to Japan",
                note: "Visit the real-world places I've only seen in anime.",
                icon: AirplaneTilt,
                photo: { src: "/bucket-list/japan.webp", alt: "A pagoda at dusk at the end of an old street in Kyoto" },
            },
            {
                title: "Travel to at least 3 countries",
                icon: GlobeHemisphereEast,
                photo: { src: "/bucket-list/three-countries.webp", alt: "A map, backpack, notebook and camera laid out for a trip" },
            },
            {
                title: "Take my parents on a trip using money I've earned myself",
                icon: Suitcase,
                photo: { src: "/bucket-list/parents-trip.webp", alt: "A family holding hands on a beach at sunset" },
            },
            {
                title: "Watch a live football match in a stadium",
                icon: SoccerBall,
                photo: { src: "/bucket-list/football.webp", alt: "A packed football stadium under the lights" },
            },
            {
                title: "Go camping under the stars",
                icon: Tent,
                photo: { src: "/bucket-list/camping.webp", alt: "Looking out of a tent at a forest" },
            },
            {
                title: "Buy a telescope and explore the stars",
                icon: Planet,
                photo: { src: "/bucket-list/telescope.webp", alt: "A telescope on a tripod under a starry night sky" },
            },
        ],
    },
    {
        title: "Thrive",
        subtitle: "lifestyle & milestones",
        items: [
            {
                title: "Buy my first bike with my own money",
                icon: Motorcycle,
                photo: { src: "/bucket-list/bike.webp", alt: "A motorcycle on an open road" },
            },
            {
                title: "Buy my first car with my own money",
                icon: Car,
                photo: { src: "/bucket-list/car.webp", alt: "The back of a grey BMW M5" },
            },
            {
                title: "Own my dream home",
                icon: HouseLine,
                photo: { src: "/bucket-list/dream-home.webp", alt: "A modern white house with a pool" },
            },
            {
                title: "Build a one-year emergency fund",
                icon: Vault,
                photo: { src: "/bucket-list/emergency-fund.webp", alt: "A hand stacking coins into small piles" },
            },
            {
                title: "Take my family on an international vacation",
                icon: AirplaneTakeoff,
                photo: { src: "/bucket-list/family-vacation.webp", alt: "An aeroplane wing above the clouds" },
            },
            {
                title: "Live in another country for a few months",
                icon: Compass,
                photo: { src: "/bucket-list/live-abroad.webp", alt: "The Eiffel Tower over the Seine at dusk" },
            },
        ],
    },
]
