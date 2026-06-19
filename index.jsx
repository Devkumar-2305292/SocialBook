// App.jsx
import { useMemo, useState } from "react";
import "./styles.css";

const initialPosts = [
  {
    id: 1,
    author: "Aman",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "2h",
    text: "Building a React clone ✨",
    likes: 12,
    comments: 3,
    shares: 1,
  },
  {
    id: 2,
    author: "Riya",
    avatar: "https://i.pravatar.cc/150?img=32",
    time: "5h",
    text: "UI looks clean—next step: auth + realtime comments.",
    likes: 48,
    comments: 8,
    shares: 2,
  },
];

function Avatar({ src, alt }) {
  return <img className="avatar" src={src} alt={alt} />;
}

function Icon({ children }) {
  return <span className="icon">{children}</span>;
}

function Post({ post, onLike, onComment, onShare }) {
  return (
    <article className="card post">
      <header className="postHeader">
        <div className="row">
          <Avatar src={post.avatar} alt={`${post.author} avatar`} />
          <div className="postMeta">
            <div className="postAuthor">{post.author}</div>
            <div className="postTime">{post.time} • <span className="muted">Public</span></div>
          </div>
        </div>
      </header>

      <div className="postText">{post.text}</div>

      <div className="postActions">
        <button className="btn actionBtn" onClick={() => onLike(post.id)}>
          <Icon>👍</Icon> Like <span className="count">{post.likes}</span>
        </button>
        <button
          className="btn actionBtn"
          onClick={() => onComment(post.id)}
        >
          <Icon>💬</Icon> Comment <span className="count">{post.comments}</span>
        </button>
        <button className="btn actionBtn" onClick={() => onShare(post.id)}>
          <Icon>↗</Icon> Share <span className="count">{post.shares}</span>
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [user] = useState({
    name: "You",
    avatar: "https://i.pravatar.cc/150?img=5",
  });
  const [composerText, setComposerText] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const sortedPosts = useMemo(() => posts, [posts]);

  const createPost = () => {
    const text = composerText.trim();
    if (!text) return;

    const newPost = {
      id: Date.now(),
      author: user.name,
      avatar: user.avatar,
      time: "now",
      text,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts((p) => [newPost, ...p]);
    setComposerText("");
  };

  const onLike = (id) =>
    setPosts((p) =>
      p.map((x) => (x.id === id ? { ...x, likes: x.likes + 1 } : x))
    );

  const onComment = (id) =>
    setPosts((p) =>
      p.map((x) => (x.id === id ? { ...x, comments: x.comments + 1 } : x))
    );

  const onShare = (id) =>
    setPosts((p) =>
      p.map((x) => (x.id === id ? { ...x, shares: x.shares + 1 } : x))
    );

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Facebook</div>
        <div className="searchWrap">
          <input className="search" placeholder="Search" />
        </div>
        <div className="topRight">
          <Avatar src={user.avatar} alt="Your avatar" />
        </div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <nav className="nav">
            <a className="navItem active" href="#">Home</a>
            <a className="navItem" href="#">Friends</a>
            <a className="navItem" href="#">Groups</a>
            <a className="navItem" href="#">Marketplace</a>
            <a className="navItem" href="#">Saved</a>
          </nav>
          <div className="sidebarFooter muted">
            Learn • Build • Share
          </div>
        </aside>

        <section className="feed">
          <div className="card composer">
            <div className="row">
              <Avatar src={user.avatar} alt="Your avatar" />
              <textarea
                className="composerInput"
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="composerFooter">
              <div className="muted">Tip: write something and hit Post.</div>
              <button className="btn primary" onClick={createPost}>
                Post
              </button>
            </div>
          </div>

          {sortedPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={onLike}
              onComment={onComment}
              onShare={onShare}
            />
          ))}
        </section>

        <aside className="rightRail">
          <div className="card">
            <div className="railTitle">Suggested</div>
            <div className="railList">
              {[
                { name: "Kavya", img: "https://i.pravatar.cc/150?img=20" },
                { name: "Vikram", img: "https://i.pravatar.cc/150?img=27" },
                { name: "Sarah", img: "https://i.pravatar.cc/150?img=41" },
              ].map((p) => (
                <div key={p.name} className="railItem">
                  <Avatar src={p.img} alt={`${p.name} avatar`} />
                  <div className="railName">{p.name}</div>
                  <button className="btn small">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="railTitle">Shortcuts</div>
            <div className="muted" style={{ padding: "10px 0" }}>
              Add more pages (profile, notifications, chat).
            </div>
          </div>
        </aside>
      </main>

      <footer className="footer muted">
        React Facebook clone UI • No backend connected
      </footer>
    </div>
  );
}
