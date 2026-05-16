
-- 140 matched records updated from raw JSON source
-- Contacts cleaned: international format fixed, concatenated numbers split (first number used), invalid nulled

UPDATE jobs SET contact = '0423693080' WHERE id IN (3115, 3953, 4215); -- 61423693080 → strip country code → 0423693080
UPDATE jobs SET contact = '0420377676', email = 'scj0406@hotmail.com' WHERE id IN (3391, 3691);
UPDATE jobs SET contact = '0431338825', email = 'chevinn01@gmail.com' WHERE id IN (3394, 3600, 3776, 3819, 4092);
UPDATE jobs SET contact = '0450469155', email = '153mooreave@gmail.com' WHERE id IN (3405, 3508, 3707, 3863);
UPDATE jobs SET contact = '0434619243' WHERE id IN (3408, 3527, 3760, 4089);
UPDATE jobs SET contact = '0430248588', email = 'anbexpress@gmail.com' WHERE id = 3410;
UPDATE jobs SET contact = '0493833522' WHERE id = 3414;
UPDATE jobs SET contact = '0426796777' WHERE id = 3415;
UPDATE jobs SET contact = '0401157114', email = 'darkkyc2@gmail.com' WHERE id = 3425;
UPDATE jobs SET contact = '0435771648', email = 'soul3841@hotmail.com' WHERE id = 3442;
UPDATE jobs SET contact = '0452078633', email = 'info@centumproperty.com.au' WHERE id IN (3449, 3678, 3956, 4200);
UPDATE jobs SET contact = '0405167499', email = 'Eastwood@UnlimtedKoreanBBQ.com.au' WHERE id IN (3451, 3954);
UPDATE jobs SET contact = '0405098176', email = 'rokyosushi@gmail.com' WHERE id IN (3452, 3596, 3721, 3889, 4221);
UPDATE jobs SET contact = '0432702358', email = 'mkh2230727@gmail.com' WHERE id IN (3453, 3458, 3510, 3607);
UPDATE jobs SET contact = '0432702358' WHERE id IN (3785);
UPDATE jobs SET contact = '0411228714', email = 'smpsb01@gmail.com' WHERE id IN (3460, 3757, 4124);
UPDATE jobs SET contact = '0478798611' WHERE id IN (3461, 3552);
UPDATE jobs SET email = 'account@seoulmart.com.au' WHERE id IN (3471, 4009);
UPDATE jobs SET contact = '0433500701', email = 'bjtotalcoating@gmail.com' WHERE id = 3489;
UPDATE jobs SET contact = '0475853018', email = 'report@ahabeauty.com.au' WHERE id IN (3492, 4007);
UPDATE jobs SET contact = '0423701260', email = 'Control0829@gmail.com' WHERE id IN (3493, 3790, 3971, 4110);
UPDATE jobs SET contact = '0451600616' WHERE id IN (3503, 3657);
UPDATE jobs SET contact = '0481946530', email = 'pristinespecialsolution@gmail.com' WHERE id IN (3524, 3653, 3943, 4082);
UPDATE jobs SET contact = '0432380092' WHERE id = 3549;
UPDATE jobs SET contact = '0421167803', email = 'whwndus1010@naver.com' WHERE id IN (3554, 3787, 3963);
UPDATE jobs SET contact = '0430800453', email = 'j383302407@naver.com' WHERE id IN (3558, 3689, 3957, 4125);
UPDATE jobs SET contact = '0492942016', email = 'Rechovahtcs@gmail.com' WHERE id IN (3562, 3814);
UPDATE jobs SET contact = '0492942016', email = 'Jmjh1228@gmail.com' WHERE id = 3566;
UPDATE jobs SET contact = '0431043770', email = 'wanpard@naver.com' WHERE id = 3567;
UPDATE jobs SET contact = '0452529164' WHERE id IN (3582, 3656);
UPDATE jobs SET contact = '0492835133', email = 'sinyoungparktwo4859@gmail.com' WHERE id IN (3591, 3982, 4212);
UPDATE jobs SET contact = '0494577724', email = 'hairbeautyon80@gmail.com' WHERE id IN (3604, 3838);
UPDATE jobs SET contact = '0433072636', email = 'maxtiles2006@gmail.com' WHERE id = 3650;
UPDATE jobs SET contact = '0430177009', email = 'kururestaurant@gmail.com' WHERE id = 3708;
UPDATE jobs SET contact = '0421627678' WHERE id = 3723;
UPDATE jobs SET contact = '0452596104', email = 'seoencreative@gmail.com' WHERE id = 3725;
UPDATE jobs SET contact = '0401355110' WHERE id IN (3726, 3873, 4059);
UPDATE jobs SET contact = '0435294811' WHERE id = 3728;
UPDATE jobs SET contact = '0433519222', email = 'bistroredpepper@gmail.com' WHERE id = 3733;
UPDATE jobs SET contact = '0406242412', email = 'bistroredpepper@gmail.com' WHERE id = 3734;
UPDATE jobs SET contact = '0493924434' WHERE id IN (3740, 3741);
-- 3743: 0000000000 is invalid → NULL
UPDATE jobs SET contact = NULL WHERE id = 3743;
UPDATE jobs SET contact = '0402171606' WHERE id IN (3747, 3912);
UPDATE jobs SET contact = '0430777015', email = 'usujeong@gmail.com' WHERE id = 3752;
UPDATE jobs SET contact = '0416123888' WHERE id IN (3808, 3809, 4073, 4201);
UPDATE jobs SET contact = '0414963456', email = 'julianchoi@hanmail.net' WHERE id = 3812;
UPDATE jobs SET contact = '0401470543', email = 'dkd9090@naver.com' WHERE id IN (3816, 4159);
UPDATE jobs SET contact = '0431338825', email = 'chevinn01@gmail.com' WHERE id = 3819;
UPDATE jobs SET contact = '0414271009', email = 'sdc99271@gmail.com' WHERE id = 3828;
UPDATE jobs SET contact = '0493228098', email = 'swlsdk115@gmail.com' WHERE id = 3829;
UPDATE jobs SET contact = '0452186430', email = 'yongsgonefishing@gmail.com' WHERE id IN (3847, 4083);
UPDATE jobs SET contact = '0435665059', email = 'tlsdlswocc720@gmail.com' WHERE id IN (3851, 4085);
UPDATE jobs SET contact = '0452584667' WHERE id = 3865;
UPDATE jobs SET email = 'jobs@elleo.com.au' WHERE id = 3878;
UPDATE jobs SET contact = '0297459888', email = 'strathfielddentalcare@gmail.com' WHERE id = 3885;
UPDATE jobs SET contact = '0405474262', email = 'info@thepprojects.com.au' WHERE id IN (3887, 4198);
UPDATE jobs SET contact = '0422280857', email = 'foxada@nate.com' WHERE id IN (3895, 4136);
-- 3908, 4155: '04032335240451713808' = two numbers concatenated, use first: 0403233524
UPDATE jobs SET contact = '0403233524' WHERE id IN (3908, 4155);
-- kura pyrmont different listing
UPDATE jobs SET contact = '0403233524' WHERE id = 3676;
UPDATE jobs SET contact = '0431697269', email = 'ddda1258@naver.com' WHERE id IN (3922, 4111);
UPDATE jobs SET contact = '0432612533' WHERE id = 3948;
UPDATE jobs SET contact = '0450511091', email = 'redroh0107@gmail.com' WHERE id = 3984;
UPDATE jobs SET contact = '0402635625' WHERE id IN (3989, 4074);
UPDATE jobs SET contact = '0451786202', email = 'dooooodixx@gmail.com' WHERE id = 4001;
UPDATE jobs SET email = 'account@freezium.com.au' WHERE id = 4008;
UPDATE jobs SET contact = '0432297031' WHERE id = 4018;
-- 3959: 480009740 = 9 digits (missing leading 0) → 0480009740
UPDATE jobs SET contact = '0480009740', email = 'jae1440@gmail.com' WHERE id = 3959;
UPDATE jobs SET contact = '0434514515', email = 'gakcorp@gmail.com' WHERE id = 4051;
UPDATE jobs SET contact = '0489035045' WHERE id = 4057;
UPDATE jobs SET contact = '0478085245', email = 'wjfeotlfj@naver.com' WHERE id IN (4061, 3789);
-- 4065: 04000000 is invalid → NULL, keep email
UPDATE jobs SET contact = NULL, email = 'marketing@meconsulting.agency' WHERE id = 4065;
UPDATE jobs SET contact = '0466885606', email = 'junesim111432@gmail.com' WHERE id = 4079;
UPDATE jobs SET contact = '0413663270', email = 'bestile.syd@gmail.com' WHERE id = 4081;
UPDATE jobs SET contact = '0434545634', email = 'Lsh4811@hanmail.net' WHERE id = 4119;
-- 4175: 422707880 = 9 digits → 0422707880
UPDATE jobs SET contact = '0422707880' WHERE id = 4175;
UPDATE jobs SET contact = '0430524415' WHERE id = 4177;
UPDATE jobs SET contact = '0430983693', email = 'obligehair@gmail.com' WHERE id = 4244;
UPDATE jobs SET contact = '0408442758', email = 'ckartistrystudio@gmail.com' WHERE id = 4245;
;
