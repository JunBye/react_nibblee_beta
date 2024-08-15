import React, {useState, useEffect} from "react";
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import ThemeModal from "../components/ReadingPage/ThemeModal";
import Menu from "../components/ReadingPage/Menu";
import MainContent from "../components/ReadingPage/MainContent";
import ProgressBar from "../components/ReadingPage/ProgressBar";


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');

  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    font-family: 'Cabin', sans-serif;
  }
`;

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${props => props.theme.headerBackgroundColor};
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  &:hover {
    color: #007bff;
  }
`;
const lightTheme = {
  backgroundColor: 'white',
  textColor: 'black',
  headerBackgroundColor: '#f8f9fa',
  modalBackgroundColor: 'white',
  modalTextColor: 'black',
};

const darkTheme = {
  backgroundColor: 'black',
  textColor: 'white',
  headerBackgroundColor: '#222',
  modalBackgroundColor: '#444',
  modalTextColor: 'white',
};

function ReadingPage({isLogin, setIsLogin}){
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    fontType: 'Literata',
    lineHeight: '1.5',
    backgroundColor: 'white',
    mode : 'Tap'
  });
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const theme = settings.backgroundColor === 'white' ? lightTheme : darkTheme;

  useEffect(() => {
    // 여기서 콘텐츠를 불러옵니다. 실제 구현에서는 API 호출 등을 사용할 수 있습니다.
    const fetchContent = async () => {
      // 예시 콘텐츠
      const exampleContent = `
        <p>첫 번째 문단입니다. 이것은 예시 텍스트입니다.</p>
        <p>두 번째 문단입니다. 독서 페이지의 기능을 테스트하기 위한 내용입니다.</p>
        <p>세 번째 문단입니다. 설정에 따라 페이지가 나뉘는 것을 확인할 수 있습니다.</p>
        <p>네 번째 문단입니다. 이것은 예시 텍스트입니다.</p>
        <p>다섯 번째 문단입니다. 독서 페이지의 기능을 테스트하기 위한 내용입니다.</p>
        <p>여섯 번째 문단입니다. 설정에 따라 페이지가 나뉘는 것을 확인할 수 있습니다.</p>
        <p>일곱 번째 문단입니다. 이것은 예시 텍스트입니다.</p>
        <p>여덟 번째 문단입니다. 독서 페이지의 기능을 테스트하기 위한 내용입니다.</p>
        <p>아홉 번째 문단입니다. 설정에 따라 페이지가 나뉘는 것을 확인할 수 있습니다.</p>
        <p>열 번째 문단입니다. 이것은 예시 텍스트입니다.</p>
        <p>11 번째 문단입니다. 독서 페이지의 기능을 테스트하기 위한 내용입니다.</p>
        <p>12 번째 문단입니다. 설정에 따라 페이지가 나뉘는 것을 확인할 수 있습니다.</p>
        <p>13 번째 문단입니다. 이것은 예시 텍스트입니다.</p>
        <p>14 번째 문단입니다. 독서 페이지의 기능을 테스트하기 위한 내용입니다.</p>
        <p>15 번째 문단입니다. 설정에 따라 페이지가 나뉘는 것을 확인할 수 있습니다.</p>
        <p>
        I thought I was a genius.
 
Looking back now, it seems like a ridiculous idea, but I really thought I was a genius.
 
I had enough talent to be deluded like that. I didn't have much trouble learning new things since I was young, and I was quicker than others at gaining skills.
 
But nothing comes easy forever. Even though I learned faster than others at first, I eventually slowed down like everyone else.
 
I didn't think much about it.
It's possible, right?
I'm gradually getting better.
I can do it.
I'm a genius.
 
At the end, I came to realize the reality I didn't want to see.
 
I'm not a genius.
 
What shattered my foolish delusion was meeting a 'real' genius who was incomparable to me.
 
Like a frog in a well who deludes themselves into thinking they're a genius, I was drunk on my own superiority in my small well. Meanwhile, the real geniuses were already soaring high in the vast sky.
 
I hate geniuses.
 
It makes my blood boil to hear them blabber about what they can do is something anyone can do. After listening to them, I felt awful, regardless of whether they truly believe that or are trying to despise people who are less capable.
 
‘Are you jealous?’
 
Jealous of what? You are the one who gave me an attitude. There's nothing to be jealous of.
 
‘I didn't know you would react like that. I just... felt sorry for you.’
 
Sorry for what?
 
‘If you just put in a little more effort...’
 
Who do you think you are? Don’t act like you know everything.
 
‘You could do much better than this.’
 
Hey, I'm already doing enough as it is. Your standards are incredibly high. How can everyone else be like you? Just because you’re a genius doesn’t mean everyone else can be one as well.
 
Do you understand?
 
I can't be like you.
 
***
 
"Get lost."
 
In an attempt to speak, I screeched out a voice that wouldn’t come out. A hole pierced through my chest. I felt like pouring precious elixir into it and using magic, but it was all useless.
 
"Please."
 
Wow, you crying for real? I never imagined that that girl would make such a face. She’s always nitpicking and making an unpleasant expressions, but maybe she has grown attached.
 
"So... I told you. Just go back. Why do you keep insisting and following me?“
 
"Senya. Put that in first."
 
My voice didn't come out as I intended. It was because of the blood that shot out of my throat.
 
"Why do you want to use the precious elixir that there are only a few left? Don't do anything stupid."
 
"But..."
 
"It's over. I know my body best. I can't live. I'm going to die soon."
 
I'm going to die.
 
I had accepted this before the hole was pierced in my chest. My body has been deteriorating since the beginning. Go back, wait. Despite the worries and the scolding, I followed them all the way here.
 
"...You could have avoided this."
 
A blunt voice. Bastard, he’s still acting like an asshole.
 
"You didn't have to do this."
 
"I said, get lost."
 
How come you keep talking and annoying me when you can barely speak?
 
"You must have known, too."
 
I get it. I understand that you are not into this. Even though it seemed like a desperate situation to others, it might not have been a big deal to you.
 
Did I not know that? I knew it very well. We've been together for a long time. I know how ridiculous you are, more than the many people who call you a monster.
 
"...You don’t have to die like this."
 
Then how should I die? You know it well. It was a miracle just to get this far. If it weren't for you, I could never have come this far.
 
"...This is an honorable death."
 
Saying this is hard enough, but I have to.
 
"It was obvious that we would be a burden and I didn’t want to be a part of it."
 
I didn't want to live the rest of my life with a crippled body.
 
"Since you're so damn good, I don't have to cover for you, right?"
 
Knowing that, I threw myself forward. My body, which couldn't move well, moved as I thought for a moment. Thanks to that, I pushed nasty guy away and a large hole pierced through my chest.
 
"...I'm sleepy, so go away now."
 
Even squeezing out my voice is becoming increasingly difficult. I can’t move my fingers and my body feels heavy. In front of me is gradually turning black.
 
"Thank you."
 
At the end.
 
I heard his voice. Bastard, if you're planning to say something, do it quickly. But still, it feels good. I've never heard you say thank you in my entire life.
 
"Waaah."
 
What the hell.
 
***
 
Demon Slayer. God of War. Master of All.
 
There are many titles attached to the great Vermouth, but the most representative title is this.
 
Hero.
 
[Hero. The great Vermouth left on an adventure with his comrades 300 years ago.]
 
A story that has been around since crawling on all fours.
 
The great Vermouth.
 
Wise Senya.
 
Faithful Anise.
 
Brave Moron.
 
Dull Hamel.
 
"Why am I the only dull one when everyone else is great, wise, faithful, and brave?"
 
Every time the nanny read a fairy tale to him, a fire ignited in Eugene Lionheart's chest. If only he could speak properly other than babbling! If only he could move his body properly!
 
"Even that lump Moron is called brave, so why am I the dull one? Don't you think it has to be opposite?"
 
No matter how much he thought about it, the phrase "brave Moron" was unacceptable.
 
"Bravery my ass. Moron is a retard."
 
[Dull Hamel always envied Vermouth. Hamel considered Vermouth, who was more talented than himself, his rival, but no one else thought so.]
 
"This bastard who wrote this must have been the one who beaten by me 300 years ago."
 
Eugene grinded his teeth as he muttered. Actually, the content was not entirely incomprehensible. This kind of fairy tale should be easy to read and have fun and moral lessons, especially targeting children.
 
[Hamel always took the lead over Vermouth. Even at the crossroads leading to the Demon King's Castle, He insisted on going left when Vermouth said to go right.]
 
"Damn it."
 
[In the end, Vermouth listened to Hamel's words. But there was a trap set by the Demon King... Stupid Hamel! He shouted that the Demon King had set up the trap because he was afraid of him. What an idiot!]
 
Ten-year-old Eugene clenched his fists. He had read this fairy tale hundreds of times, but this passage always made him angry.
 
[Hamel was accident-prone. Because of his hot temper, he always quarreled with his comrades.]
 
"...That's true."
 
[After many adventures, Vermouth and his comrades entered the Demon King's castle. But dull Hamel did not listen to Vermouth even in the castle. As always, he led the way and couldn't avoid the traps, which put Vermouth and his comrades in great danger.]
 
"Someone who doesn't even know anything."
 
Eugene said with a scowl. The demon castle was like hell, and the traps there were impossible to avoid. Even if you knew there was a trap ahead, you had to break through it.
 
[...Hamel, who always quarreled with his comrades. Foolish Hamel. Violent Hamel. But Hamel loved his comrades. Even though he was covered in wounds, he sacrificed himself for his comrades instead of running away.]
 
"..."
 
[At the end of his life, Hamel regretted his past he couldn't be honest about with his beloved comrades. Senya, I liked you.]
 
"I didn't like you."
 
[Anise, pray for me.]
 
"I didn't say that."
 
[Moron. You're a warrior braver than anyone else.]
 
"That bastard is a blockhead."
 
[Vermouth. You must defeat the Demon King. Vermouth swore on Hamel's tears. I will definitely defeat the Demon King. Hamel closed his eyes comfortably at those words...]
 
There is nothing to see after this. Eugene closed the book with a frustrated expression.
 
"Sacrificed for children's fairy tales."
 
Children, even that dull Hamel harbored a sense of justice in his heart. He sacrificed himself for his comrades and regretted his past for not being honest...
 
"Fuck, selling my name for such a cheap lesson?"
 
No matter how many times he read it, it made him angry. Eugene threw the fairy tale book and couldn’t hide his anger. He wanted to find the author of this fairy tale and beat him to a pulp, but the author had been anonymous since 300 years ago.
 
"Vermouth, Senya, Anise, and Moron. They're all bastards. Why did they leave this kind of fairy tale? Damn Senya. She cried so much when I died...! Didn't they even think about protecting the honor of their fellows?"
 
Maybe they didn't.
 
After venting his frustration, Eugene calmed his breathing and thought. No one would imagine Hamel coming back with all the memory of his past.
 
Reincarnation!
 
Eugene thought back to his infancy, crying in his crib. In his opinion, his infancy was just as terrible as the Demon King's Castle. His mind was fine, but his body didn't move properly. He couldn't speak well either. It was a terrible and boring time spent mostly sucking on pacifiers and chewing on toys hanging from the ceiling.
 
There is got to be a reason if a ten-year-old boy has shitty shape of eyes. He must have opened up his eyes, wasting whole time.

Eugene sighed deeply.
 
"...Reincarnation is good, but why was I born as Vermouth's descendant?"
 
Lionheart was the Vermouth family name.
 
"There are so many other places to be reincarnated. Why Vermouth?"
 
Someone might love it, but Eugene, who had memories of his past life, couldn't do that.
 
He had always wanted to surpass Vermouth in his lifetime.
 
He didn't openly declare Vermouth as his rival like in a fairy tale, but he was always conscious of him during their travels together.
 
In the end, he couldn't surpass Vermouth no matter how hard he tried.
 
"The Great Vermouth."
 
Eugene looked up at the large portrait hanging on the wall. The Vermouth in the painting was exactly the same as his previous life's memories.
 
"Dull Hamel."
 
He took out a mirror from his pocket and looked at his face. It was the face of a ten-year-old child, not resembling Vermouth. However, his last name was Lionheart, and he was the descendant of the great hero Vermouth.
 
At first, he thought he was dreaming after he died. But he had been aware of reality for a long time.
 
Dull Hamel was reborn as the descendant of the Great Vermouth.
 
*
 
In his lifetime, Vermouth had many mistresses besides his legitimate wife.
 
"He wasn't even the type to flaunt women. Did he change his mind as he got older?"
 
The Vermouth Eugene remembered was not lacking in human flaws, but rather a withered man. It was hard to believe that such a man had ten mistresses and fathered descendants.
 
"He's still a man, so I guess I can understand."
 
Only the legitimate heirs were recognized in the main household, the descendants of the Lord's Chamber. Although they had the same Lionheart surname, Eugene's family was a collateral branch.
 
But that didn't mean they were in a difficult situation. While it cannot compare to the splendor of the ancestral home in the capital, the mansion where Eugene lives is still luxurious enough to stand out in this rural village. Even as a member of a branch family, they receive decent treatment.
 
The large training ground in their spacious mansion was particularly noteworthy. Hero, God of War, Master of All. The Great Vermouth's bloodline must not neglect their training. That was something Eugene had heard from a young age.
 
"Again..."
 
Jehard Lionheart looked at his ten-year-old son with astonishment. Jehard himself had been trained diligently since a young age, but he always felt guilty about his own abilities that couldn’t fulfill the fame of his heritage.
 
His ancestor was the great Vermouth, but Jehard had no particular talent for martial arts.
 
"...You ruined it."
 
Whenever he saw his son, Jehard felt a complex mix of emotions. The child's behavior was far from childish, with an intense, piercing gaze and no hint of innocence. Although he lost his mother at a young age, the boy had never once cried out for her.
 
That was not all. His son's talent was...so incredible that it was hard to believe he was his flesh and blood.
 
‘A monster.’
 
It was a silly thought to have for an only child, but it was also true that Jehard felt afraid. When he was just ten years old, he had not even started learning how to use mana. How could such a young child wield a sword with skills?
 
"After all, it got broken," said Eugene.
 
Eugene put down his practice sword with a pout. The wooden sword, reinforced with iron, was too heavy for a child to wield with strength. Yet, Eugene had insisted on using such a sword since he was seven years old.
 
At first, Jehard thought it was just childish stubbornness. He found the sight of a young child swinging a heavy wooden sword to be adorable.
 
That was already three years ago. Now, Eugene could easily wield the heavy sword and was not satisfied with it. He even filled his sandbag to train his strength further.
 
Jehard swallowed his saliva and looked down at the ground. The broken practice sword. The completely destroyed training dummy. How long had it been since he replaced them? Three days? It was no surprise. Ever since they started training, they had broken all the training dummies in the yard and had to replace them regularly.
 
"The blacksmith in town is idiot."
 
Eugene exclaimed. Although the words were harsh for a child, Jehard didn't even try to point out the fact. It was his nature. He had tried to correct him since he was young, but his son's temperament never changed.
 
"Selling such shoddy products for money. We should bring them here and give him a punch, but you are too merciful."
 
"Uh... I'll take your suggestion into account. Next time, I'll get something sturdier..."
 
"Not a training dummy, just a pure iron block will do. There's no need to make it look fancy when all we're doing is swinging a wooden sword."
 
Jehard couldn't come up with a reply as he stared at his son. His ten-year-old body was trained to the point of being unbelievable. To be honest, he felt like he would lose if he fought him bare-handed...
 
"He's got a natural talent for martial arts..."
 
Jehard couldn't feel pure joy for his son's talent. Was it because he felt like his son was a monster? That wasn't the reason. Among the various emotions Jehard felt for his son, a sense of pride was also there. Wasn't he born with such brilliant talent, unlike his father?
 
However, along with pride came guilt. It was an unavoidable reality as an insufficient father. Just because he was a Lionheart didn't mean they were all the same. They had already been pushed out of their ancestral home hundreds of years ago, and Jehard's family was still being ignored among the collateral branches.
 
Does his son know about that reality? He probably doesn't. It's too difficult of a story for a young child to understand.
 
"Can't I use a real sword?"
 
Even now. Jehard was shaking his head with a bitter expression.
 
"Not now."
 
"Because of the Blood Succession Ceremony?"
 
"That's right. In three years, after you complete the Blood Succession Ceremony, you'll be able to wield a real sword."
 
"Can't it be just our secret between you and me, Father?"
 
"I... can't do that. I'm also a Lionheart, so I can't ignore our family's traditions.“
 
Blood Succession Ceremony. It is a tradition of the Lionheart family that occurs once in a decade. The ceremony gathers all children from the ages of ten to fifteen who carry the Lionheart name, including both direct and collateral descendants, at the ancestral home.
 
The ceremony is simple. Who is most worthy to inherit the Lionheart family's legacy among them? Who is not ashamed to claim the title of “hero's descendant?” The 'real' weapon can only be wielded after the Bloodline Ceremony is over.
 
‘What a ridiculous tradition.’
 
Eugene didn't speak his thoughts out loud, but he couldn't help feeling ridiculous and annoyed every time he heard about the ceremony and the tradition.
 
The Blood Succession Ceremony oppresses only the collateral descendants.
 
Before the ceremony, the children of collateral descendants are not allowed to wield real weapons nor practice mana. But the direct descendants of the ancestral home can wield any weapon they desire, regardless of age, and are introduced to mana from the moment they take their first steps.
 
‘In the end, that's what it is. Collateral descendants are beaten down from childhood so they cannot surpass the direct descendants.’
 
The oppression is so explicit that even a child could understand it. Eugene may have been young, but he was not immature.
 
Jehard could not read his son's mind, but he felt multiple emotions just by looking at his chubby face.
 
He thought his son was cute when he pouted, but his sense of guilt outweighed any positive feelings.
 
‘If only you were born in the ancestral home...’
 
His son's talent was brilliant, but the collateral descendants of the Lionheart family had clear limitations. Even if his son was exceptionally talented for his age, there was no way he could compete against the true prodigies who were raised in the ancestral home.
 
This reality tormented Jehard. He would rather have been talentless like his father. Then, he would not have felt any discrepancy between his talent and reality.
 
"Why is your expression like that, Father?"
 
"No... It's nothing."
 
'No, it is. It's so obvious that you’re blaming yourself for your own inadequacy again.‘
 
Eugene looked at Jehard with a sneer as he licked his lips. Due to his vivid memories from his past life, it was difficult for him to see Jehard as his father. However, it was a fact that he was born as Jehard's son.
 
"Father, how about we play with swords for the first time in a while?"
 
"Hmm... what?"
 
"I said, let's play with swords."
 
Eugene didn't use the word "duel" because he considered how his father would feel about being asked to duel by his ten-year-old son. That's why he used the word "play," but Jehard's expression froze and became stiff.
 
Jehard felt the weight of his thickened belly, and he looked at his son's arms as he swung the sword with the iron core as if it were a toy.
 
"Let's... do it next time."
 
It was the moment he realized that he is pretty suffering with his ten-year-old son. Jehard felt sweat trickling down his back as he took a step back.
 
Eugene snickered as he watched his father walk away.
        </p>
      `;
      setContent(exampleContent);
    };

    fetchContent();
  }, []);

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newCurrentPage, newTotalPages = totalPages) => {
    setCurrentPage(newCurrentPage);
    setTotalPages(newTotalPages);
  };

  const handleSaveProgress = () => {
    // 진행 상황 저장 로직
    console.log(`Saved progress: Page ${currentPage + 1} of ${totalPages}`);
    // 실제 구현에서는 서버에 저장하는 로직을 추가할 수 있습니다.
  };

  return (
    <ThemeProvider theme ={theme}>
      <GlobalStyle/>
      <PageContainer>
        <Header>
          <HeaderButton onClick={() => setShowThemeModal(true)}>Aa</HeaderButton>
          <HeaderButton onClick={() => setShowMenu(true)}>Menu</HeaderButton>
        </Header>

        <MainContent
          settings={settings}
          content={content}
          currentPageFromProgressBar={currentPage}
          onPageChange={handlePageChange}
        //   onPageChange={(newCurrentPage, newTotalPages) => {
        //     setCurrentPage(newCurrentPage);
        //     setTotalPages(newTotalPages);
        //  }}
       />

        <ProgressBar
         currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
         onSaveProgress={handleSaveProgress}
       />

        <ThemeModal
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
       />

       <Menu
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          isLogin ={isLogin} setIsLogin={setIsLogin}
        />
      </PageContainer>
    </ThemeProvider>
    
  );
};

export default ReadingPage;

