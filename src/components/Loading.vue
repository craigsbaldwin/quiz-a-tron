<template>
  <div class="loading">
    <div class="loading__container">
      <div class="loading__robot">
        <div class="loading__animation">
          <div class="loading__square loading__square--1"></div>
          <div class="loading__square loading__square--2"></div>
          <div class="loading__square loading__square--3"></div>
          <div class="loading__square loading__square--4"></div>
          <div class="loading__square loading__square--5"></div>
          <div class="loading__square loading__square--6"></div>
          <div class="loading__square loading__square--7"></div>
          <div class="loading__square loading__square--8"></div>
          <div class="loading__square loading__square--9"></div>
        </div>

        <svg class="robot" viewBox="0 0 422 575" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity=".1" d="M211 575c116.532 0 211-15.67 211-35s-94.468-35-211-35S0 520.67 0 540s94.468 35 211 35z" fill="#1B2229"/>
          <path d="M313.689 112.698h-206.07c-7.163 0-12.97 5.807-12.97 12.97v81.659c0 7.163 5.807 12.969 12.97 12.969h206.07c7.163 0 12.97-5.806 12.97-12.969v-81.659c0-7.163-5.807-12.97-12.97-12.97z" fill="#462EB4"/>
          <path d="M230.825 220.293h-40.347v23.543h40.347v-23.543z" fill="#462EB4"/>
          <path d="M294.716 237.109H126.593v134.498h168.123V237.109z" fill="#462EB4"/>
          <path d="M298.078 398.507H123.23v16.812h174.848v-16.812z" fill="#462EB4"/>
          <path d="M151.811 533.004h30.262V432.131h-30.262v100.873z" fill="#462EB4"/>
          <path d="M242.597 432.131v100.873h30.262V432.131h-30.262z" fill="#462EB4"/>
          <path d="M103.693 267.372v31.1a45.478 45.478 0 00-22.354 10.776 52.885 52.885 0 00-13.308 19.513c-3.89 9.425-5.781 19.892-6.553 29.788a170.315 170.315 0 001.86 39.961H29.714c-1.428-18.587-.973-34.535.88-48.228 2.076-15.438 5.92-28.005 10.791-38.225 9.742-20.432 23.597-31.517 35.77-37.537 14.458-7.148 26.538-7.148 26.538-7.148z" fill="#462EB4"/>
          <path d="M317.615 267.372v31.1a45.474 45.474 0 0122.354 10.776 52.878 52.878 0 0113.308 19.513c3.891 9.425 5.782 19.892 6.554 29.788.951 13.347.327 26.76-1.861 39.961h33.624c1.428-18.587.973-34.535-.88-48.228-2.076-15.438-5.92-28.005-10.791-38.225-9.741-20.432-23.597-31.517-35.77-37.537-14.458-7.148-26.538-7.148-26.538-7.148z" fill="#462EB4"/>
          <path d="M151.466 13.122h-11.578v99.576h11.578V13.122z" fill="#462EB4"/>
          <path d="M284.233 13.122h-11.578v99.576h11.578V13.122z" fill="#462EB4"/>
          <path opacity=".3" d="M308.165 129.51H113.143v73.974h195.022V129.51z" fill="#1B2229"/>
          <g opacity=".3" fill="#1B2229">
            <path d="M182.073 432.131h-30.262v23.537h30.262v-23.537z"/>
            <path d="M182.073 475.843h-30.262v30.262h30.262v-30.262z"/>
            <path d="M182.073 522.917h-30.262v10.088h30.262v-10.088z"/>
            <path d="M272.86 432.131h-30.262v23.537h30.262v-23.537z"/>
            <path d="M272.86 475.843h-30.262v30.262h30.262v-30.262z"/>
            <path d="M272.86 522.917h-30.262v10.088h30.262v-10.088z"/>
            <path d="M103.693 267.372v31.1a45.477 45.477 0 00-22.354 10.776l-4.184-34.728c14.458-7.148 26.538-7.148 26.538-7.148z"/>
            <path d="M68.031 328.761c-3.89 9.425-5.781 19.892-6.553 29.788l-30.884-8.267c2.076-15.438 5.92-28.005 10.791-38.225l26.646 16.704z"/>
            <path d="M317.615 267.372v31.1a45.474 45.474 0 0122.354 10.776l4.184-34.728c-14.458-7.148-26.538-7.148-26.538-7.148z"/>
            <path d="M353.277 328.761c3.891 9.425 5.782 19.892 6.554 29.788l30.883-8.267c-2.076-15.438-5.92-28.005-10.791-38.225l-26.646 16.704z"/>
          </g>
          <g class="robot__shade" opacity=".5" fill="#1B2229">
            <path d="M308.165 203.782H113.143v2.018h195.022v-2.018z"/>
            <path d="M230.825 220.293h-40.347v2.787h40.347v-2.787z"/>
            <path d="M297.703 261.073v56.31a11.734 11.734 0 01-3.126-7.981v-40.355a11.713 11.713 0 013.126-7.974z"/>
            <path d="M127.19 264.786v42.154a11.724 11.724 0 01-3.134 7.132v-56.419a11.727 11.727 0 013.134 7.133z"/>
            <path d="M286.31 371.609H135.001v1.992H286.31v-1.992z"/>
            <path d="M205.607 415.322h-73.971v1.544h73.971v-1.544z"/>
            <path d="M286.31 415.322h-73.972v1.544h73.972v-1.544z"/>
          </g>
          <g class="robot__eyes">
            <path d="M262.772 194.941c14.856 0 26.9-12.044 26.9-26.9 0-14.856-12.044-26.9-26.9-26.9-14.856 0-26.899 12.044-26.899 26.9 0 14.856 12.043 26.9 26.899 26.9z" fill="#2ECC71"/>
            <path opacity=".15" d="M262.772 194.941c14.856 0 26.9-12.044 26.9-26.9 0-14.856-12.044-26.9-26.9-26.9-14.856 0-26.899 12.044-26.899 26.9 0 14.856 12.043 26.9 26.899 26.9z" fill="#1B2229"/>
            <path d="M289.653 166.041c-1.023 13.922-12.643 24.9-26.827 24.9-14.183 0-25.803-10.978-26.826-24.9 1.023-13.922 12.643-24.9 26.826-24.9 14.184 0 25.804 10.978 26.827 24.9z" fill="#2ECC71"/>
            <path d="M159.9 194.941c14.856 0 26.899-12.044 26.899-26.9 0-14.856-12.043-26.9-26.899-26.9-14.857 0-26.9 12.044-26.9 26.9 0 14.856 12.043 26.9 26.9 26.9z" fill="#2ECC71"/>
            <path opacity=".15" d="M159.9 194.941c14.856 0 26.899-12.044 26.899-26.9 0-14.856-12.043-26.9-26.899-26.9-14.857 0-26.9 12.044-26.9 26.9 0 14.856 12.043 26.9 26.9 26.9z" fill="#1B2229"/>
            <path d="M186.78 166.041c-1.023 13.922-12.643 24.9-26.826 24.9-14.184 0-25.803-10.978-26.827-24.9 1.024-13.922 12.643-24.9 26.827-24.9 14.183 0 25.803 10.978 26.826 24.9z" fill="#2ECC71"/>
          </g>
          <g class="robot__blink">
            <path d="M236.152 165.165a27.05 27.05 0 00-.152 2.876c0 14.856 12.043 26.9 26.9 26.9 14.856 0 26.899-12.044 26.899-26.9 0-.548-.016-1.092-.048-1.632-1.2 13.747-12.739 24.532-26.797 24.532-14.184 0-25.803-10.978-26.827-24.9a9.78 9.78 0 00.025-.876z" fill="#2ECC71"/>
            <path d="M133.152 165.165a27.05 27.05 0 00-.152 2.876c0 14.856 12.043 26.9 26.9 26.9 14.856 0 26.899-12.044 26.899-26.9 0-.548-.016-1.092-.048-1.632-1.2 13.747-12.739 24.532-26.797 24.532-14.184 0-25.803-10.978-26.827-24.9a9.78 9.78 0 00.025-.876z" fill="#2ECC71"/>
          </g>
          <circle opacity=".3" cx="279" cy="14" r="13" fill="#1B2229"/>
          <circle cx="279" cy="13" r="13" fill="#462EB4"/>
          <circle opacity=".3" cx="146" cy="14" r="13" fill="#1B2229"/>
          <circle cx="146" cy="13" r="13" fill="#462EB4"/></svg>
      </div>
    </div>

    <div class="loading__text">{{ text }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
    }
  }
</script>
