import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link , useNavigate, useLocation} from "react-router-dom"; // detail 상품 id 받아오기.
import { Container, Row, Col, Button } from "react-bootstrap";
import ".././styles/Detail.css";
import NovelCarousel from "../components/NovelCarousel";
import Card from "../components/Card";
function Detail(){
    let {id} = useParams();
    let novels = useSelector( (state) => {return state.novels})
    let novel = novels.find((x) => x.id === parseInt(id));
    const similarNovels = findSimilarNovels(novels, novel.id);
    const [sections, setSections] = useState(10); // 임시로 10개의 에피소드가 있다고 가정
    const navigate = useNavigate();
    const location = useLocation();
    const goToRead= () =>{
        navigate(`${location.pathname}/read`);
    }

    // localStorage에 사용자가 최근 접속한 detail 페이지들을 보여주도록 함.
    // 처음 접속할때, 이 detail 페이지의 id를 받고 넘겨줘야함.
    // 매번 접속할때마다, setItem 진행하기.
    useEffect(()=>{
        let update = JSON.parse(localStorage.getItem('watched'));
        update.push(id);
        update = new Set(update);
        update = Array.from(update); // Set 자료형으로 중복 id 제거
        localStorage.setItem('watched', JSON.stringify(update));
    },[]) 
    if (!novel) return <div>Novel not found</div>

    return ( // made by claude 3.5
        <Container className="detail-container">
            <section className="novel-info">
                <Row>
                    <Col md={4}>
                        <img src={novel.img} alt={novel.title} className="novel-image" />
                    </Col>
                    <Col md={8}>
                        <h1>{novel.title}</h1>
                        <p>Author: {novel.author}</p>
                        <p>Released: {novel.launch}</p>
                        <Button variant="primary" onClick={goToRead}>Read Episode 1</Button>
                    </Col>
                </Row>
            </section>

            <hr className="section-divider" />

            <section className="sections">
                <h2>Sections (Total: {sections})</h2>
                <ul>
                    {[...Array(5)].map((_, index) => (
                        <li key={index}>
                            <Link to={`/read/${novel.id}/${index + 1}`}>Episode {index + 1}</Link>
                        </li>
                    ))}
                </ul>
                <Button variant="secondary">Show All Sections</Button>
            </section>

            <hr className="section-divider" />

            <section className="team-info">
                <h3>Localization Team</h3>
                <p>Information about the localization team...</p>
            </section>

            <hr className="section-divider" />

            <section className="creative-info">
                <h3>Creative</h3>
                <p>Information about the creative team...</p>
            </section>

            <hr className="section-divider"/>

            <section className = "Recommend-info">
                <NovelCarousel 
                    novels = {similarNovels.slice(0,8)} 
                    title ="Recommendation for similar novels"/>
            </section>
        </Container>
    );

}

function findSimilarNovels(novels, targetId){
    const targetNovel = novels.find(novel => novel.id === targetId);

    if(!targetNovel) return [];

    // 2. create Set of target Keywords(대소문자 구별 x)
    const targetKeywords = new Set(targetNovel.keyword.map(kw => kw.toLowerCase()));

    // 3. filter and map novels(유사도 계산해서 새로운 key : value로 객체에 넣기)
    const mappedNovels = novels
        .filter(novel => novel.id !== targetId) // target 제외 배열
        .map(novel =>{
            const similarKeywords = novel.keyword.filter(kw=>
                targetKeywords.has(kw.toLowerCase())  // 기준 keyword들과 똑같은 keyword return
            );
            return{  // [ {}, {}, {}] 형태로 return
                ...novel,
                similarityScore : similarKeywords.length,
                similarKeywords : similarKeywords
            };
        });
    
        // 4. SimilarityScore 기준으로 정렬
        const sortedNovels = mappedNovels.sort((a,b)=>{
            if(b.similarityScore !== a.similarityScore){
                return b.similarScore - a.similarScore;
            }
            return a.id - b.id // 동일하면 id 순
        })

        // 5. 상위 8개만 보여주기
        return sortedNovels;
        
}
export default Detail;