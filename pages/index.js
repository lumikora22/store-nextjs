import BasicLayout from '../layouts/BasicLayout';
import Slider from 'react-slick';

export default function Home() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,

		autoplay: true,
		variableWidth: true,
	};
	return (
		<BasicLayout>
			<div className='main-page'>
				<Slider {...settings} className="slider-contain">
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/camara2_024fa9096a.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/gamer1_c041e49de4.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/laptop2_fdb248bed5.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/276142776_1299802363861832_5248237789331440514_n_632c5d2536.jpg' />
					</div>
				</Slider>
			</div>
		</BasicLayout>
	);
}
