import { useState } from 'react';
import './App.scss';
import love_empty from './assets/Vector.svg';
import love_full from './assets/love.svg';

interface Post {
  id: number;
  date: string;
  subtitle: string;
  paragraph: string;
}

function App() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  const posts: Post[] = [
    {
      id: 1,
      date: '12 de jul, 2024',
      subtitle: 'GitHub agora permite fazer login sem precisar de senha',
      paragraph: 'O GitHub anunciou o acesso a partir das passkeys, método de autenticação sem senhas. A novidade está disponível em uma versão beta pública.'
    },
    {
      id: 2,
      date: '10 de jun, 2024',
      subtitle: 'JavaScript continua como a linguagem mais popular',
      paragraph: 'Pelo 10º ano consecutivo, o JavaScript continua sendo a linguagem de programação mais usada no mundo.'
    },
    {
      id: 3,
      date: '1 de mai, 2024',
      subtitle: 'Inteligência Artificial avança no desenvolvimento de software',
      paragraph: 'A IA está cada vez mais presente em soluções de automação e otimização de desenvolvimento de software, facilitando processos complexos.'
    },
    {
      id: 4,
      date: '25 de abr, 2024',
      subtitle: 'React 18 lançado com novos recursos',
      paragraph: 'A nova versão do React inclui melhorias de desempenho e a introdução de recursos como o "Automatic Batching" para uma melhor experiência de desenvolvimento.'
    },
    {
      id: 5,
      date: '15 de mar, 2024',
      subtitle: 'Web3 e o futuro descentralizado da internet',
      paragraph: 'A Web3 está se popularizando como a nova fase da internet, com foco em descentralização e maior controle pelos usuários sobre seus dados.'
    }
  ];

  const toggleFavorite = (postId: number) => {
    if (favorites.includes(postId)) {
      setFavorites(favorites.filter(fav => fav !== postId)); 
    } else {
      setFavorites([...favorites, postId]); 
    }
  };

  const isFavorited = (postId: number) => favorites.includes(postId);

  const filteredPosts = posts.filter(post => 
    post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.paragraph.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='blog'>
      <header className='blog__header'>
        <div className='blog__container'>
          <h1 className='blog__title'><span>Code</span>Lab</h1>
          <input 
            className='blog__input' 
            placeholder='Pesquisar no blog' 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <main className='blog__main'>
        <div className='blog__container'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div 
                key={post.id} 
                className={`post ${isFavorited(post.id) ? 'post--favorited' : ''}`} 
              >
                <span className="post__date">{post.date}</span>
                <h2 className="post__subtitle">{post.subtitle}</h2>
                <p className="post__paragraph">{post.paragraph}</p>
                <div className="post__favorite" onClick={() => toggleFavorite(post.id)}>
                  <img
                    className="post__loveIcon"
                    src={isFavorited(post.id) ? love_full : love_empty}
                    alt={isFavorited(post.id) ? "Ícone de favorito" : "Ícone de não favoritado"}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum post encontrado.</p> 
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
