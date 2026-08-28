import { useEffect, useState } from 'react';
import styles from './PostDetail.module.css';

const mockPosts = {
  'hello-world': {
    title: '你好，我的博客世界',
    date: '2025-03-18',
    tags: ['随笔', '成长'],
    content: (
      <>
        <p>欢迎来到我的第一篇文章。这里将记录我在编程、设计与生活中的思考，希望这些内容能对你有帮助。</p>
        <h2>为什么开始写博客</h2>
        <p>写作是一种很好的思考方式。把零散的想法组织成完整的文字，往往能帮助我发现理解上的盲区，也让知识更加牢固。</p>
        <p>除此之外，我也希望通过公开分享，结识更多志同道合的朋友。每一次交流都可能带来新的视角。</p>
        <ul>
          <li>记录学习过程中的思考与收获</li>
          <li>分享踩坑经验与解决方案</li>
          <li>与更多开发者交流想法</li>
        </ul>
        <blockquote>写作不是为了被所有人喜欢，而是为了把思考沉淀成更清晰的东西。</blockquote>
        <p>接下来的日子里，我会持续更新。感谢你的阅读，也欢迎在评论区和我讨论。</p>
      </>
    ),
  },
  'css-layout': {
    title: '一次优雅的中文排版实践',
    date: '2025-03-20',
    tags: ['CSS', '设计'],
    content: (
      <>
        <p>中文排版最重要的不是花哨的效果，而是让读者可以长时间舒适地阅读。适当的行距、段落间距和留白都不可或缺。</p>
        <h2>排版的基本要素</h2>
        <p>字号、行高、字间距和最大宽度共同决定了阅读体验。对于正文，我通常会将行高控制在 1.8 左右，并限制每行长度。</p>
        <ul>
          <li>正文行高：1.7 - 2.0</li>
          <li>段落间距：不小于行高的一半</li>
          <li>单行长度：45 - 75 个字符</li>
        </ul>
        <blockquote>好的排版是隐形的，读者不会注意到它，但会一直感受到它的舒适。</blockquote>
        <p>本页的样式正是按照这些原则实现的，希望你在阅读时也能感受到这份从容。</p>
      </>
    ),
  },
};

function getPostIdFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/(?:post|article)\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function PostDetail() {
  const [postId, setPostId] = useState(getPostIdFromPath);

  useEffect(() => {
    const syncPostId = () => setPostId(getPostIdFromPath());
    syncPostId();
    window.addEventListener('popstate', syncPostId);
    return () => window.removeEventListener('popstate', syncPostId);
  }, []);

  const post = mockPosts[postId];
  if (!post) return null;

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          <time className={styles.date} dateTime={post.date}>{post.date}</time>
          <span className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </span>
        </p>
      </header>
      <div className={styles.content}>{post.content}</div>
    </article>
  );
}

export default PostDetail;
export { PostDetail, getPostIdFromPath, mockPosts };
