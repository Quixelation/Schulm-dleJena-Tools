import { increase_brightness } from "./../../utils";
function createEmojiImage(emoji: string) {
  return `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='170px' height='50px'> 
    <rect x='0' y='0' width='170' height='50'
      style='fill:%2300000000 ;  fill-opacity: 0.0; '/> 
    <text x='85' y='30' 
      style='fill:white; text-anchor: middle; font-family:Arial' font-size='24' 
      transform=''> 
      ${emoji} 
    </text> 
  </svg>`;
}
type hexString = string;
function createWavesImage(color: hexString) {
  return `<svg height='100%' width='100%' id='bg-svg' viewBox='0 0 1440 700'
	xmlns='http://www.w3.org/2000/svg' class='transition duration-300 ease-in-out delay-150'>
	<defs>
		<linearGradient id='gradient'>
			<stop offset='5%' stop-color='${color}44'  ></stop>
			<stop offset='95%' stop-color='${increase_brightness(color, 10)}44' ></stop>
		</linearGradient>
	</defs>
	<path d='M 0,700 C 0,700 0,140 0,140 C 83.96172248803825,157.67464114832535 167.9234449760765,175.34928229665073 267,166 C 366.0765550239235,156.65071770334927 480.2679425837322,120.2775119617225 575,107 C 669.7320574162678,93.7224880382775 745.0047846889952,103.54066985645933 851,109 C 956.9952153110048,114.45933014354067 1093.7129186602872,115.5598086124402 1197,120 C 1300.2870813397128,124.4401913875598 1370.1435406698565,132.2200956937799 1440,140 C 1440,140 1440,700 1440,700 Z' stroke='none' stroke-width='0' fill='url(#gradient)' class='transition-all duration-300 ease-in-out delay-150'></path>
	<defs>
		<linearGradient id='gradient'>
			<stop offset='5%' stop-color='${color}66'></stop>
			<stop offset='95%' stop-color='${increase_brightness(color, 10)}66'></stop>
		</linearGradient>
	</defs>
	<path d='M 0,700 C 0,700 0,280 0,280 C 108.09569377990434,265.42583732057415 216.19138755980867,250.85167464114832 303,246 C 389.8086124401913,241.14832535885168 455.33014354066984,246.01913875598086 555,264 C 654.6698564593302,281.98086124401914 788.4880382775118,313.0717703349282 878,317 C 967.5119617224882,320.9282296650718 1012.7177033492824,297.6937799043062 1099,287 C 1185.2822966507176,276.3062200956938 1312.6411483253587,278.1531100478469 1440,280 C 1440,280 1440,700 1440,700 Z' stroke='none' stroke-width='0' fill='url(#gradient)' class='transition-all duration-300 ease-in-out delay-150'></path>
	<defs>
		<linearGradient id='gradient'>
			<stop offset='5%' stop-color='${color}88'  ></stop>
			<stop offset='95%' stop-color='${increase_brightness(color, 10)}88' ></stop>
		</linearGradient>
	</defs>
	<path d='M 0,700 C 0,700 0,420 0,420 C 111.70334928229664,391.0047846889952 223.40669856459328,362.00956937799043 327,368 C 430.5933014354067,373.99043062200957 526.0765550239236,414.9665071770335 596,441 C 665.9234449760764,467.0334928229665 710.2870813397128,478.12440191387566 813,471 C 915.7129186602872,463.87559808612434 1076.7751196172248,438.53588516746413 1191,427 C 1305.2248803827752,415.46411483253587 1372.6124401913876,417.73205741626793 1440,420 C 1440,420 1440,700 1440,700 Z' stroke='none' stroke-width='0' fill='url(#gradient)' class='transition-all duration-300 ease-in-out delay-150'></path>
	<defs>
		<linearGradient id='gradient'>
			<stop offset='5%' stop-color='${color}ff' ></stop>
			<stop offset='95%' stop-color='${increase_brightness(color, 10)}ff'></stop>
		</linearGradient>
	</defs>
	<path d='M 0,700 C 0,700 0,560 0,560 C 104.00956937799043,535.9808612440191 208.01913875598086,511.9617224880383 319,517 C 429.98086124401914,522.0382775119617 547.933014354067,556.133971291866 623,558 C 698.066985645933,559.866028708134 730.2488038277511,529.5023923444977 811,533 C 891.7511961722489,536.4976076555023 1021.0717703349283,573.8564593301435 1134,584 C 1246.9282296650717,594.1435406698565 1343.4641148325359,577.0717703349283 1440,560 C 1440,560 1440,700 1440,700 Z' stroke='none' stroke-width='0' fill='url(#gradient)' class='transition-all duration-300 ease-in-out delay-150'></path>
</svg>`;
}
export { createEmojiImage, createWavesImage };
