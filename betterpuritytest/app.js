let isScoreVisible = false;

class Question {
    text;
    value;
    id;
    number;
    checked;
    
    constructor(number, text, value) {
        this.text = text;
        this.value = value;
        this.number = number;
        this.id = "q" + number;

        this.createHTML();
    }

    toggleCheck() {
        if (this.checked) {
            document.querySelector(`#${this.id}`).classList.remove("checked");
        } else {
            document.querySelector(`#${this.id}`).classList.add("checked");
        }

        this.checked = !this.checked;
    }

    createHTML() {
        document.querySelector(".question-wrapper").innerHTML += `
        <div id=${this.id} class="question" onclick="toggleCheck('${this.id}')">
            <span class="check-indicator"></span>
            <span>${this.number}. ${this.text}</span>
        </div>`;
    }
}

const questions = [
    new Question(1, "Held hands romantically?", 1),
    new Question(2, "Been on a date?", 1),
    new Question(3, "Been in a relationship?", 2),
    new Question(4, "Danced without leaving room for Jesus?", 2),
    new Question(5, "Kissed a non-family member?", 1),
    new Question(6, "Kissed a non-family member on the lips?", 1),
    new Question(7, "French kissed?", 2),
    new Question(8, "French kissed in public?", 3),
    new Question(9, "Kissed on the neck?", 2),
    new Question(10, "Kissed horizontally?", 3),
    new Question(11, "Given or received a hickey?", 2),
    new Question(12, "Kissed or been kissed on the breast?", 3),
    new Question(13, "Kissed someone below the belt?", 4),
    new Question(14, "Kissed for more that 2 hours consecutively?", 4),
    new Question(15, "Played a game involving stripping?", 3),
    new Question(16, "Seen or ben seen by another person in a sexual context?", 3),
    new Question(17, "Masturbated?", 2),
    new Question(18, "Masturbated to a picture or video?", 2),
    new Question(19, "Masturbated while someone else was in the room?", 4),
    new Question(20, "Been caught masturbating?", 4),
    new Question(21, "Masturbated with an inanimate object?", 4),
    new Question(22, "Seen or read pornographic material?", 2),
    new Question(23, "Massaged or been massaged sensually?", 3),
    new Question(24, "Gone through the motions of intercourse while fully dressed?", 4),
    new Question(25, "Undressed or been undressed by a MPS?", 5),
    new Question(26, "Showered with an MPS?", 5),
    new Question(27, "Fondled or had your buttcheeks fondled?", 4),
    new Question(28, "Fondled or had your breasts fondled?", 4),
    new Question(29, "Fondled or had your genitals fondled?", 5),
    new Question(30, "Had or given 'blue balls'?", 3),
    new Question(31, "Had an orgasm due to someone else's manipulation?", 4),
    new Question(32, "Sent a sexually explicit text or instant message?", 3),
    new Question(33, "Sent or received explicit photographs?", 3),
    new Question(34, "Engaged in sexually explicit activity over video chat?", 4),
    new Question(35, "Cheated on a significant other?", 5),
    new Question(36, "Purchased contraceptives?", 2),
    new Question(37, "Gave oral sex?", 6),
    new Question(38, "Received oral sex?", 6),
    new Question(39, "Ingested someone else's genital secretion?", 7),
    new Question(40, "Used a sex toy with a partner?", 5),
    new Question(41, "Spent the night with an MPS?", 4),
    new Question(42, "Been walked in on while engaging in a sexual act?", 6),
    new Question(43, "Kicked a roommate out to commit a sexual act?", 5),
    new Question(44, "Ingested alcohol in a non-religious context?", 2),
    new Question(45, "Played a drinking game?", 2),
    new Question(46, "Been drunk?", 3),
    new Question(47, "Faked sobriety to parents or teachers?", 3),
    new Question(48, "Had severe memory loss due to alcohol?", 4),
    new Question(49, "Used tobacco?", 3),
    new Question(50, "Used marijuana?", 3),
    new Question(51, "Used a drug stronger than marijuana?", 4),
    new Question(52, "Used methamphetamine, crack cocaine, PCP, horse tranquilizers or heroin?", 9),
    new Question(53, "Been sent to the office of a principal, dean or judicial affairs representative for a disciplinary infraction?", 3),
    new Question(54, "Been put on disciplinary probation or suspended?", 6),
    new Question(55, "Urinated in public?", 4),
    new Question(56, "Gone skinny-dipping?", 4),
    new Question(57, "Gone streaking?", 4),
    new Question(58, "Seen a stripper?", 3),
    new Question(59, "Had the police called on you?", 3),
    new Question(60, "Run from the police?", 5),
    new Question(61, "Had the police handcuff you?", 6),
    new Question(62, "Had the police question you?", 5),
    new Question(63, "Been arrested?", 7),
    new Question(64, "Been convicted of a crime?", 8),
    new Question(65, "Been convicted of a felony?", 10),
    new Question(66, "Committed an act of vandalism?", 5),
    new Question(67, "Had sexual intercourse?", 4),
    new Question(68, "Had sexual intercouse 3 or more times in one night?", 6),
    new Question(69, "?", 4),
    new Question(70, "Had sexual intercourse 10 or more times?", 5),
    new Question(71, "Had sexual intercourse with a person you've known for less than 24 hours?", 5),
    new Question(72, "Had sexual intercourse in at least 4 distinct positions?", 5),
    new Question(73, "Had sexual intercourse in a motor vehicle?", 5),
    new Question(74, "Had sexual intercourse outdoors?", 6),
    new Question(75, "Had sexual intercourse in public?", 7),
    new Question(76, "Had sexual intercourse in a hot tub or swimming pool?", 5),
    new Question(77, "Had sexual intercourse in a bed not belonging to you or your partner?", 6),
    new Question(78, "Had sexual intercourse while you or your partner's parents were in the same home?", 6),
    new Question(79, "Had sexual intercourse with non-participating third party in the same room?", 7),
    new Question(80, "Joined the mile high club?", 7),
    new Question(81, "Participated in a 'booty-call' with a person you are not in a relationship with?", 5),
    new Question(82, "Traveled at least 100 miles for the primary purpose of sexual intercourse?", 6),
    new Question(83, "Had sexual intercourse with a partner with at least a 3 year age difference?", 5),
    new Question(84, "Had sexual intercourse with a virgin?", 7),
    new Question(85, "Had sexual intercourse without a condom?", 9),
    new Question(86, "Had a STI test due to reasonable suspicion?", 7),
    new Question(87, "Had a STI?", 8),
    new Question(88, "Had a threesome?", 6),
    new Question(89, "Attended an orgy?", 7),
    new Question(90, "Had two or more distinct acts of sexual intercourse with at least 2 partners in one night?", 6),
    new Question(91, "Had sexual intercourse with 5 or more partners?", 6),
    new Question(92, "Been photographed or filmed during sexual intercourse?", 7),
    new Question(93, "Had period sex?", 7),
    new Question(94, "Had anal sex?", 8),
    new Question(95, "Had a pregnancy scare?", 9),
    new Question(96, "Impregnated someone or been impregnated?", 10),
    new Question(97, "Paid or been paid for a sexual act?", 8),
    new Question(98, "Committed an act of voyeurism?", 6),
    new Question(99, "Committed an act of incest?", 8),
    new Question(100, "Engaged in bestiality?", 10),
];

const toggleCheck = (id) => {
    let questionToToggle = questions.filter(question => question.id === id)[0];
    questionToToggle.toggleCheck();
};

const toggleScore = () => {
    if (!isScoreVisible) {
        document.querySelector(".overlay").style.display = "flex";
        window.scrollTo(0, 0);
        document.body.style.overflowY = "hidden";
        
        let score = questions.filter(question => question.checked).reduce((acc, curr) => acc + curr.value, 0);
        document.querySelector(".score-container").textContent = `You Scored ${100 - Math.floor(score * 0.209643605870021)}`;
    } else {
        document.querySelector(".overlay").style.display = "none";
        document.body.style.overflowY = "scroll";
    }

    isScoreVisible = !isScoreVisible;
}