import * as $ from 'jquery';
import * as _ from 'lodash';
import { CasperMedia } from '../Casper/CasperMedia';

export class YoutubeSearch {
  private query: string;
  private SEACH_URL: string = 'https://www.googleapis.com/youtube/v3/';
  private API_METHOD: string = 'search';
  private API_KEY: string;

  constructor(apiKey: string) {
      this.API_KEY = apiKey;
  }

  searchByKeyword(keyword: string): any {
    return this.search(keyword);
  }

  private parseResults(youtubeData: any): Array<CasperMedia> {
    var payload: Array<CasperMedia> = [];
    if (youtubeData) {
      _.each(youtubeData.videos.items, (v) => {
        let tempResult = {
          resourceID: v.id.videoId,
          title: v.snippet.title,
          smlImage: v.snippet.thumbnails.default.url,
          medImageUrl: v.snippet.thumbnails.default.url,
          lrgImageUrl: v.snippet.thumbnails.default.url,
          canStream: true,
          link: '',
          playCount: 0
        };
        payload.push(new CasperMedia(tempResult));
      });
    }
    return payload;
  }

  private getQueryURL() {
    return this.SEACH_URL +
      this.API_METHOD +
      'q?=' + this.query +
      '&type=video' +
      '&key=' + this.API_KEY +
      '&part=snippet';
  }

  private search(keyword: string): any {
    this.query = keyword;
    const ajaxOptions = {
      type: 'GET',
      dataType : 'json',
      url : this.getQueryURL()
    };
    return $.ajax(ajaxOptions)
      .then(this.parseResults);
  }


}
