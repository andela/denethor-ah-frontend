import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const InactiveLikeButton = ({ btnColor='#ADAAAA', onClick }) => {
  return (
    <svg onClick={onClick} className='like-icon' viewBox="0 0 18 19" fill={btnColor || '#ADAAAA'} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4253 10.62C17.8071 10.056 18 9.436 18 8.76C18 7.976 17.7044 7.296 17.1092 6.716C16.514 6.136 15.8121 5.848 14.9993 5.848H12.9345C13.3081 5.096 13.4969 4.364 13.4969 3.656C13.4969 2.764 13.3615 2.056 13.0864 1.532C12.8114 1.008 12.4132 0.62 11.8919 0.372C11.3706 0.124 10.7836 0 10.1268 0C9.72862 0 9.3756 0.14 9.07184 0.424C8.73523 0.744 8.49304 1.156 8.34527 1.656C8.19749 2.16 8.07845 2.64 7.98814 3.1C7.89783 3.56 7.75827 3.888 7.57355 4.076C7.19179 4.48 6.77309 4.968 6.31745 5.536C5.5293 6.532 4.99156 7.124 4.71243 7.308H1.49829C1.08369 7.308 0.730673 7.452 0.439225 7.736C0.147776 8.024 0 8.368 0 8.772V16.08C0 16.484 0.147776 16.828 0.439225 17.112C0.730673 17.396 1.0878 17.54 1.49829 17.54H4.87252C5.04493 17.54 5.58267 17.692 6.48985 17.996C7.4504 18.324 8.29601 18.572 9.02668 18.744C9.75735 18.916 10.4962 19 11.2474 19H12.3352H12.758C13.8582 19 14.7448 18.692 15.418 18.08C16.0912 17.468 16.4237 16.632 16.4155 15.572C16.8835 14.984 17.1174 14.308 17.1174 13.54C17.1174 13.372 17.1051 13.208 17.0805 13.048C17.3761 12.54 17.5279 11.988 17.5279 11.404C17.532 11.136 17.4992 10.872 17.4253 10.62ZM2.77902 15.864C2.63124 16.008 2.45473 16.08 2.25359 16.08C2.05245 16.08 1.87594 16.008 1.72816 15.864C1.58039 15.72 1.5065 15.548 1.5065 15.348C1.5065 15.152 1.58039 14.98 1.72816 14.836C1.87594 14.692 2.05245 14.62 2.25359 14.62C2.45473 14.62 2.63124 14.692 2.77902 14.836C2.9268 14.98 3.00068 15.152 3.00068 15.348C3.00068 15.548 2.9268 15.72 2.77902 15.864ZM16.2513 9.696C16.083 10.048 15.8737 10.224 15.6233 10.232C15.7423 10.36 15.8367 10.544 15.9147 10.776C15.9927 11.008 16.0296 11.22 16.0296 11.408C16.0296 11.932 15.8244 12.388 15.4098 12.768C15.5494 13.012 15.6192 13.276 15.6192 13.556C15.6192 13.836 15.5494 14.116 15.4139 14.396C15.2784 14.672 15.0896 14.872 14.8556 14.996C14.8967 15.224 14.9131 15.436 14.9131 15.636C14.9131 16.908 14.1619 17.544 12.6636 17.544H11.2474C10.2253 17.544 8.88711 17.268 7.24105 16.712C7.2 16.696 7.08917 16.656 6.90034 16.592C6.71152 16.528 6.57605 16.48 6.48575 16.448C6.39544 16.416 6.25998 16.372 6.07526 16.316C5.89054 16.26 5.74276 16.216 5.63193 16.192C5.51699 16.164 5.38974 16.14 5.24607 16.116C5.10239 16.092 4.97925 16.08 4.87663 16.08H4.50308V8.772H4.87663C4.99977 8.772 5.13934 8.736 5.29122 8.668C5.4431 8.6 5.59909 8.496 5.75918 8.36C5.91927 8.224 6.07115 8.088 6.21072 7.956C6.35029 7.824 6.50627 7.656 6.67868 7.452C6.85108 7.252 6.98655 7.088 7.08506 6.968C7.18358 6.848 7.30673 6.692 7.4545 6.5C7.60228 6.308 7.69259 6.196 7.72543 6.156C8.15644 5.64 8.4561 5.292 8.62851 5.116C8.94869 4.788 9.18267 4.372 9.32634 3.864C9.47001 3.356 9.58905 2.88 9.68347 2.432C9.77788 1.984 9.92566 1.66 10.1309 1.46C10.8821 1.46 11.3829 1.64 11.6292 1.996C11.8796 2.352 12.0027 2.904 12.0027 3.652C12.0027 4.1 11.8139 4.712 11.4404 5.484C11.0668 6.256 10.878 6.864 10.878 7.304H15.0034C15.3934 7.304 15.7423 7.452 16.0461 7.744C16.3498 8.036 16.5017 8.376 16.5017 8.768C16.5017 9.036 16.4196 9.348 16.2513 9.696Z" />
    </svg>
  );
}

const CommentButton = () => {
  return (
    <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.67123 4.35325C2.78538 3.00753 4.30512 1.94914 6.22068 1.16853C8.13624 0.387913 10.2277 0 12.5 0C14.7674 0 16.8638 0.387913 18.7793 1.16853C20.6949 1.94914 22.2097 3.01231 23.3239 4.35325C24.4429 5.69897 25 7.16442 25 8.7496C25 10.1193 24.5797 11.3979 23.7392 12.5952C22.8987 13.7877 21.7455 14.7934 20.2844 15.6027C20.387 15.9667 20.5092 16.3115 20.646 16.642C20.7877 16.9724 20.9099 17.2406 21.0223 17.4465C21.1347 17.6572 21.2862 17.8871 21.4767 18.1457C21.6673 18.3995 21.809 18.5815 21.9068 18.6869C22.0045 18.7922 22.1658 18.9647 22.3905 19.2041C22.6153 19.4436 22.757 19.6016 22.8206 19.6782C22.8303 19.683 22.8694 19.7213 22.933 19.8027C22.9965 19.8794 23.0307 19.9177 23.0307 19.9177L23.1138 20.0422C23.1626 20.1092 23.1822 20.1523 23.1773 20.1715C23.1724 20.1907 23.1822 20.2338 23.2066 20.3104C23.231 20.3822 23.2262 20.4397 23.2017 20.4732V20.4876C23.1626 20.6408 23.0893 20.7701 22.9769 20.8659C22.8645 20.9617 22.7375 21.0096 22.6007 21.0096H22.5323C21.9263 20.9377 21.3986 20.8372 20.9441 20.7079C18.5057 20.0949 16.3702 18.9934 14.528 17.3986C13.8292 17.4705 13.1548 17.5088 12.5049 17.5088C10.2375 17.5088 8.14113 17.1209 6.22557 16.3403C4.31001 15.5596 2.79515 14.5013 1.67611 13.1555C0.561963 11.8098 -2.86335e-07 10.3444 -2.86335e-07 8.75918C-2.86335e-07 7.16442 0.557076 5.69897 1.67123 4.35325ZM3.24472 12.236C4.21716 13.3136 5.52678 14.166 7.17846 14.7982C8.83014 15.4303 10.604 15.7464 12.5 15.7464C13.0668 15.7464 13.6728 15.7081 14.3129 15.6363L15.1095 15.5548L15.7105 16.0769C16.854 17.0634 18.1343 17.8392 19.5465 18.4139C19.1165 17.6764 18.794 16.891 18.5692 16.0625L18.1929 14.7503L19.4048 14.0655C20.6167 13.395 21.55 12.5952 22.2146 11.6709C22.8792 10.7466 23.2115 9.77446 23.2115 8.7496C23.2115 7.49966 22.7277 6.34071 21.7553 5.26317C20.7828 4.18563 19.4732 3.33318 17.8215 2.70103C16.1699 2.06887 14.396 1.75279 12.5 1.75279C10.604 1.75279 8.83014 2.06887 7.17846 2.70103C5.52678 3.33318 4.21716 4.19042 3.24472 5.26317C2.27228 6.34071 1.78851 7.49966 1.78851 8.7496C1.78851 9.99954 2.27228 11.1633 3.24472 12.236Z" fill="#ADAAAA"/>
    </svg>
    );
  }

const CommentImpressionButton = ({ likeCount, onClick, likeImpression}) => {
  const color = likeImpression ? '#822E2E' : '#ADAAAA';
  return (
    <span className='likes-number-group'>
      <svg onClick={() => console.log('yea')} className='like-icon' viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4253 10.62C17.8071 10.056 18 9.436 18 8.76C18 7.976 17.7044 7.296 17.1092 6.716C16.514 6.136 15.8121 5.848 14.9993 5.848H12.9345C13.3081 5.096 13.4969 4.364 13.4969 3.656C13.4969 2.764 13.3615 2.056 13.0864 1.532C12.8114 1.008 12.4132 0.62 11.8919 0.372C11.3706 0.124 10.7836 0 10.1268 0C9.72862 0 9.3756 0.14 9.07184 0.424C8.73523 0.744 8.49304 1.156 8.34527 1.656C8.19749 2.16 8.07845 2.64 7.98814 3.1C7.89783 3.56 7.75827 3.888 7.57355 4.076C7.19179 4.48 6.77309 4.968 6.31745 5.536C5.5293 6.532 4.99156 7.124 4.71243 7.308H1.49829C1.08369 7.308 0.730673 7.452 0.439225 7.736C0.147776 8.024 0 8.368 0 8.772V16.08C0 16.484 0.147776 16.828 0.439225 17.112C0.730673 17.396 1.0878 17.54 1.49829 17.54H4.87252C5.04493 17.54 5.58267 17.692 6.48985 17.996C7.4504 18.324 8.29601 18.572 9.02668 18.744C9.75735 18.916 10.4962 19 11.2474 19H12.3352H12.758C13.8582 19 14.7448 18.692 15.418 18.08C16.0912 17.468 16.4237 16.632 16.4155 15.572C16.8835 14.984 17.1174 14.308 17.1174 13.54C17.1174 13.372 17.1051 13.208 17.0805 13.048C17.3761 12.54 17.5279 11.988 17.5279 11.404C17.532 11.136 17.4992 10.872 17.4253 10.62ZM2.77902 15.864C2.63124 16.008 2.45473 16.08 2.25359 16.08C2.05245 16.08 1.87594 16.008 1.72816 15.864C1.58039 15.72 1.5065 15.548 1.5065 15.348C1.5065 15.152 1.58039 14.98 1.72816 14.836C1.87594 14.692 2.05245 14.62 2.25359 14.62C2.45473 14.62 2.63124 14.692 2.77902 14.836C2.9268 14.98 3.00068 15.152 3.00068 15.348C3.00068 15.548 2.9268 15.72 2.77902 15.864ZM16.2513 9.696C16.083 10.048 15.8737 10.224 15.6233 10.232C15.7423 10.36 15.8367 10.544 15.9147 10.776C15.9927 11.008 16.0296 11.22 16.0296 11.408C16.0296 11.932 15.8244 12.388 15.4098 12.768C15.5494 13.012 15.6192 13.276 15.6192 13.556C15.6192 13.836 15.5494 14.116 15.4139 14.396C15.2784 14.672 15.0896 14.872 14.8556 14.996C14.8967 15.224 14.9131 15.436 14.9131 15.636C14.9131 16.908 14.1619 17.544 12.6636 17.544H11.2474C10.2253 17.544 8.88711 17.268 7.24105 16.712C7.2 16.696 7.08917 16.656 6.90034 16.592C6.71152 16.528 6.57605 16.48 6.48575 16.448C6.39544 16.416 6.25998 16.372 6.07526 16.316C5.89054 16.26 5.74276 16.216 5.63193 16.192C5.51699 16.164 5.38974 16.14 5.24607 16.116C5.10239 16.092 4.97925 16.08 4.87663 16.08H4.50308V8.772H4.87663C4.99977 8.772 5.13934 8.736 5.29122 8.668C5.4431 8.6 5.59909 8.496 5.75918 8.36C5.91927 8.224 6.07115 8.088 6.21072 7.956C6.35029 7.824 6.50627 7.656 6.67868 7.452C6.85108 7.252 6.98655 7.088 7.08506 6.968C7.18358 6.848 7.30673 6.692 7.4545 6.5C7.60228 6.308 7.69259 6.196 7.72543 6.156C8.15644 5.64 8.4561 5.292 8.62851 5.116C8.94869 4.788 9.18267 4.372 9.32634 3.864C9.47001 3.356 9.58905 2.88 9.68347 2.432C9.77788 1.984 9.92566 1.66 10.1309 1.46C10.8821 1.46 11.3829 1.64 11.6292 1.996C11.8796 2.352 12.0027 2.904 12.0027 3.652C12.0027 4.1 11.8139 4.712 11.4404 5.484C11.0668 6.256 10.878 6.864 10.878 7.304H15.0034C15.3934 7.304 15.7423 7.452 16.0461 7.744C16.3498 8.036 16.5017 8.376 16.5017 8.768C16.5017 9.036 16.4196 9.348 16.2513 9.696Z"fill={color} /></svg>
      <span className='like-count'>{likeCount}</span>
    </span>
  );
}


const DislikeButton = ({btnColor='#ADAAAA', onClick }) => {
  return (
    <svg className='dislike-icon' fill={btnColor || '#ADAAAA'} onClick={onClick} width="24" height="26" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0.766249 11.4704C0.257241 12.2421 6.48201e-07 13.0903 6.48201e-07 14.0152C6.48201e-07 15.0878 0.394072 16.0181 1.18769 16.8116C1.9813 17.6051 2.91722 17.9992 4.00091 17.9992H6.75393C6.25587 19.028 6.00411 20.0295 6.00411 20.9981C6.00411 22.2185 6.18472 23.1871 6.55143 23.904C6.91813 24.6209 7.44903 25.1518 8.14413 25.4911C8.83922 25.8304 9.62189 26 10.4976 26C11.0285 26 11.4992 25.8085 11.9042 25.4199C12.353 24.9821 12.6759 24.4184 12.873 23.7344C13.07 23.0448 13.2287 22.3881 13.3491 21.7588C13.4696 21.1294 13.6556 20.6807 13.9019 20.4235C14.4109 19.8708 14.9692 19.2031 15.5767 18.426C16.6276 17.0634 17.3446 16.2534 17.7168 16.0017H22.0023C22.5551 16.0017 23.0258 15.8047 23.4144 15.4161C23.803 15.0221 24 14.5515 24 13.9987V4.00042C24 3.44769 23.803 2.97706 23.4144 2.58851C23.0258 2.19996 22.5496 2.00295 22.0023 2.00295H17.5033C17.2734 2.00295 16.5564 1.79499 15.3469 1.37908C14.0661 0.93033 12.9387 0.591032 11.9644 0.355713C10.9902 0.120394 10.005 0.00547164 9.00342 0.00547164H7.55302H6.98928C5.52246 0.00547164 4.34025 0.426857 3.44265 1.26415C2.54504 2.10145 2.10171 3.24521 2.11266 4.69543C1.48871 5.49989 1.17674 6.42475 1.17674 7.47548C1.17674 7.70532 1.19316 7.9297 1.226 8.1486C0.831927 8.84361 0.629419 9.59882 0.629419 10.3978C0.623946 10.7645 0.667732 11.1257 0.766249 11.4704ZM20.2946 4.29594C20.4917 4.09893 20.727 4.00042 20.9952 4.00042C21.2634 4.00042 21.4987 4.09893 21.6958 4.29594C21.8928 4.49295 21.9913 4.72827 21.9913 5.00189C21.9913 5.27005 21.8928 5.50537 21.6958 5.70238C21.4987 5.89939 21.2634 5.99789 20.9952 5.99789C20.727 5.99789 20.4917 5.89939 20.2946 5.70238C20.0976 5.50537 19.9991 5.27005 19.9991 5.00189C19.9991 4.72827 20.0976 4.49295 20.2946 4.29594ZM2.33159 12.7346C2.55599 12.253 2.83512 12.0122 3.16899 12.0013C3.01026 11.8261 2.88438 11.5744 2.78039 11.257C2.6764 10.9396 2.62714 10.6495 2.62714 10.3923C2.62714 9.67544 2.9008 9.05157 3.45359 8.53168C3.2675 8.19785 3.17446 7.83667 3.17446 7.45359C3.17446 7.07051 3.2675 6.68743 3.44812 6.30436C3.62873 5.92675 3.8805 5.65313 4.19248 5.48348C4.13774 5.17154 4.11585 4.8815 4.11585 4.60787C4.11585 2.86761 5.11745 1.99747 7.11517 1.99747H9.00342C10.3662 1.99747 12.1505 2.37508 14.3453 3.13576C14.4 3.15765 14.5478 3.21238 14.7995 3.29994C15.0513 3.3875 15.2319 3.45317 15.3523 3.49695C15.4727 3.54073 15.6534 3.60093 15.8997 3.67754C16.146 3.75416 16.343 3.81435 16.4908 3.84719C16.644 3.8855 16.8137 3.91833 17.0052 3.95117C17.1968 3.984 17.361 4.00042 17.4978 4.00042H17.9959V13.9987H17.4978C17.3336 13.9987 17.1475 14.048 16.945 14.141C16.7425 14.2341 16.5345 14.3763 16.3211 14.5624C16.1076 14.7485 15.9051 14.9345 15.719 15.1151C15.533 15.2957 15.325 15.5256 15.0951 15.8047C14.8652 16.0783 14.6846 16.3027 14.5532 16.4668C14.4219 16.631 14.2577 16.8445 14.0607 17.1071C13.8636 17.3698 13.7432 17.523 13.6994 17.5778C13.1247 18.2837 12.7252 18.7598 12.4953 19.0006C12.0684 19.4494 11.7564 20.0185 11.5649 20.7135C11.3733 21.4085 11.2146 22.0598 11.0887 22.6727C10.9628 23.2856 10.7658 23.7289 10.4921 24.0025C9.49054 24.0025 8.82281 23.7563 8.49441 23.2692C8.16055 22.7822 7.99635 22.0269 7.99635 21.0036C7.99635 20.3907 8.24812 19.5534 8.74618 18.4972C9.24424 17.441 9.49601 16.6091 9.49601 16.0072H3.99544C3.47549 16.0072 3.01026 15.8047 2.60525 15.4052C2.20023 15.0057 1.99772 14.5405 1.99772 14.0042C1.99772 13.6375 2.10718 13.2107 2.33159 12.7346Z" />
    </svg>
  );
}

const BookMarkHeartIcon = ({btnColor='#FFFFFF', onClick }) => {
  return (
    <svg version="1.1"  fill={btnColor || '#FFFFFF'} onClick={onClick} id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 431.972 431.972">
<g>
	<path d="M393.146,14.279c-3.713-5.333-8.713-9.233-14.989-11.707c-3.997-1.711-8.186-2.568-12.565-2.568V0H66.378
		c-4.377,0-8.562,0.857-12.56,2.568c-6.28,2.472-11.278,6.377-14.989,11.707c-3.71,5.33-5.568,11.228-5.568,17.701v368.019
		c0,6.475,1.858,12.371,5.568,17.706c3.711,5.329,8.709,9.233,14.989,11.704c3.994,1.711,8.183,2.566,12.56,2.566
		c8.949,0,16.844-3.142,23.698-9.418l125.91-121.062l125.91,121.065c6.663,6.081,14.562,9.127,23.695,9.127
		c4.76,0,8.948-0.756,12.565-2.279c6.276-2.471,11.276-6.375,14.989-11.711c3.71-5.328,5.564-11.225,5.564-17.699V31.98
		C398.71,25.507,396.852,19.609,393.146,14.279z M362.166,391.139L241.397,275.224l-25.411-24.264l-25.409,24.264L69.809,391.139
		V36.549h292.357V391.139L362.166,391.139z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
  );
}



InactiveLikeButton.propTypes = {
  btnColor: PropTypes.any,
  onClick: PropTypes.func
}

DislikeButton.propTypes = {
  onClick: PropTypes.func,
  btnColor: PropTypes.any,
}

BookMarkHeartIcon.propTypes = {
  onClick: PropTypes.func,
  btnColor: PropTypes.any,
}

CommentImpressionButton.propTypes = {
  likeCount: PropTypes.number,
  onClick: PropTypes.func,
  likeImpression:  PropTypes.bool
};

export { InactiveLikeButton, DislikeButton , BookMarkHeartIcon, CommentButton, CommentImpressionButton};
