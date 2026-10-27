import React, {useState} from 'react';
import clsx from 'clsx';
import Icon from '@site/src/components/HomepageFeatures/Icons';
import {getAcademyVideo} from './catalog';
import styles from './styles.module.css';

/*
 * A Resgrid Academy video card for doc pages: the poster plays the video
 * inline (with captions) on click, and a link opens the lesson on the Academy
 * with its chapters and transcript. Available in every .md/.mdx file through
 * src/theme/MDXComponents.js:
 *
 *   <AcademyVideo id="01-people" />
 */
export default function AcademyVideo({id, stacked = false}) {
  const video = getAcademyVideo(id);
  const [playing, setPlaying] = useState(false);

  if (!video) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`AcademyVideo: unknown Resgrid Academy video "${id}"`);
    }
    return null;
  }

  const kindLabel = video.kind === 'walkthrough' ? 'Walkthrough' : 'Video lesson';

  return (
    <aside
      className={clsx(styles.card, stacked && styles.stacked)}
      aria-label={`Resgrid Academy ${kindLabel.toLowerCase()}: ${video.title}`}>
      <div className={styles.media}>
        {playing ? (
          <video
            className={styles.video}
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={video.poster}
            crossOrigin="anonymous">
            <source src={video.src} type="video/mp4" />
            <track default kind="captions" label="English" srcLang="en" src={video.captions} />
          </video>
        ) : (
          <button
            type="button"
            className={styles.poster}
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}>
            <img src={video.poster} alt="" loading="lazy" decoding="async" />
            <span className={styles.playButton} aria-hidden="true">
              <Icon name="play" size={20} strokeWidth={0} />
            </span>
            <span className={styles.duration} aria-hidden="true">
              {video.minutes.toFixed(1)} min
            </span>
          </button>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>
          <Icon name="video" size={14} />
          Resgrid Academy · {kindLabel}
        </span>
        <p className={styles.title}>{video.title}</p>
        <p className={styles.meta}>
          {video.minutes.toFixed(1)} min · {video.audience} · English captions
        </p>
        <a
          href={video.page}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}>
          Watch on Resgrid Academy with chapters and transcript
          <Icon name="externalLink" size={14} />
        </a>
      </div>
    </aside>
  );
}
