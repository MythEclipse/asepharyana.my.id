"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nama harus diisi!")
    .min(3, "Nama terlalu pendek!")
    .max(20, "Nama terlalu panjang!"),
});

// Placeholder for khodam data
const khodamList: { name: string; meaning: string }[] = [
  {
    name: "Harimau Putih",
    meaning:
      "Kamu kuat dan berani seperti harimau, karena pendahulumu mewariskan kekuatan besar padamu.",
  },
  {
    name: "Lampu Tertidur",
    meaning: "Terlihat ngantuk tapi selalu memberikan cahaya yang hangat",
  },
  {
    name: "Panda Ompong",
    meaning:
      "Kamu menggemaskan dan selalu berhasil membuat orang tersenyum dengan keanehanmu.",
  },
  {
    name: "Bebek Karet",
    meaning:
      "Kamu selalu tenang dan ceria, mampu menghadapi gelombang masalah dengan senyum.",
  },
  {
    name: "Ninja Turtle",
    meaning:
      "Kamu lincah dan tangguh, siap melindungi yang lemah dengan kekuatan tempurmu.",
  },
  {
    name: "Kucing Kulkas",
    meaning: "Kamu misterius dan selalu ada di tempat-tempat yang tak terduga.",
  },
  {
    name: "Sabun Wangi",
    meaning:
      "Kamu selalu membawa keharuman dan kesegaran di mana pun kamu berada.",
  },
  {
    name: "Semut Kecil",
    meaning:
      "Kamu pekerja keras dan selalu bisa diandalkan dalam situasi apa pun.",
  },
  {
    name: "Moge Suzuki",
    meaning:
      "Kamu cepat dan penuh gaya, selalu menjadi pusat perhatian di jalanan.",
  },
  {
    name: "Cupcake Pelangi",
    meaning:
      "Kamu manis dan penuh warna, selalu membawa kebahagiaan dan keceriaan.",
  },
  {
    name: "Robot Mini",
    meaning:
      "Kamu canggih dan selalu siap membantu dengan kecerdasan teknologi tinggi.",
  },
  {
    name: "Ikan Terbang",
    meaning: "Kamu unik dan penuh kejutan, selalu melampaui batasan yang ada.",
  },
  {
    name: "Ayam Goreng",
    meaning:
      "Kamu selalu disukai dan dinanti oleh banyak orang, penuh kelezatan dalam setiap langkahmu.",
  },
  {
    name: "Kecoa Terbang",
    meaning: "Kamu selalu mengagetkan dan bikin heboh seisi ruangan.",
  },
  {
    name: "Kambing Ngebor",
    meaning:
      "Kamu unik dan selalu bikin orang tertawa dengan tingkah lakumu yang aneh.",
  },
  {
    name: "Kerupuk Renyah",
    meaning: "Kamu selalu bikin suasana jadi lebih seru dan nikmat.",
  },
  {
    name: "Celengan Babi",
    meaning: "Kamu selalu menyimpan kejutan di dalam dirimu.",
  },
  {
    name: "Lemari Tua",
    meaning: "Kamu penuh dengan cerita dan kenangan masa lalu.",
  },
  {
    name: "Kopi Susu",
    meaning: "Kamu manis dan selalu bikin semangat orang-orang di sekitarmu.",
  },
  {
    name: "Sapu Lidi",
    meaning: "Kamu kuat dan selalu bisa diandalkan untuk membersihkan masalah.",
  },
  {
    name: "Kuda Lumping",
    meaning: "Kamu penuh semangat dan selalu tampil beda di setiap kesempatan.",
  },
  {
    name: "Sepatu Roda",
    meaning:
      "Kamu cepat dan lincah, selalu bergerak ke depan dengan penuh gaya.",
  },
  {
    name: "Bola Pingpong",
    meaning: "Kamu ringan dan selalu bikin permainan jadi lebih seru.",
  },
  {
    name: "Lumba-lumba",
    meaning: "Kamu pintar dan selalu membawa keceriaan di lautan kehidupan.",
  },
  {
    name: "Kucing Gemuk",
    meaning: "Kamu santai dan selalu bikin orang tersenyum dengan kelucuanmu.",
  },
  {
    name: "Iguana Pink",
    meaning:
      "Kamu eksotis dan selalu menarik perhatian dengan warnamu yang unik.",
  },
  {
    name: "Bantal Guling",
    meaning: "Kamu nyaman dan selalu dibutuhkan saat waktu istirahat.",
  },
  {
    name: "Komputer Jadul",
    meaning: "Kamu klasik dan penuh dengan pengetahuan di dalam dirimu.",
  },
  {
    name: "Kasur Empuk",
    meaning: "Kamu selalu memberikan kenyamanan dan ketenangan.",
  },
  {
    name: "Bola Bekel",
    meaning:
      "Kamu kecil tapi selalu memberikan kebahagiaan di setiap permainan.",
  },
  {
    name: "Es Krim Pelangi",
    meaning: "Kamu manis dan penuh warna, selalu menyegarkan hari-hari.",
  },
  {
    name: "Biskuit Coklat",
    meaning:
      "Kamu selalu bikin ketagihan dengan kelezatanmu yang tak tertahankan.",
  },
  {
    name: "Nasi Padang",
    meaning: "Kamu selalu bikin kenyang dan puas dengan kelezatanmu yang khas.",
  },
  {
    name: "Roti Bakar",
    meaning: "Kamu sederhana tapi selalu bikin orang merasa nyaman.",
  },
  {
    name: "Sepeda Ontel",
    meaning:
      "Kamu klasik dan selalu memberikan kesenangan di setiap perjalanan.",
  },
  {
    name: "Sate Kambing",
    meaning: "Kamu gurih dan selalu jadi favorit di setiap kesempatan.",
  },
  {
    name: "Kue Cubit",
    meaning:
      "Kamu kecil tapi selalu bikin orang bahagia dengan rasamu yang enak.",
  },
  {
    name: "Bakso Urat",
    meaning: "Kamu kuat dan selalu memberikan kenikmatan di setiap gigitan.",
  },
  {
    name: "Es Kelapa",
    meaning: "Kamu segar dan selalu bikin adem di saat-saat panas.",
  },
  {
    name: "Siomay Bandung",
    meaning: "Kamu selalu bikin ketagihan dengan rasa khasmu yang lezat.",
  },
  {
    name: "Bajigur Hangat",
    meaning: "Kamu selalu bikin suasana jadi hangat dan nyaman.",
  },
  {
    name: "Martabak Manis",
    meaning: "Kamu penuh kejutan dengan isi yang manis dan nikmat.",
  },
  {
    name: "Permen Karet",
    meaning:
      "Kamu selalu bikin suasana jadi lebih ceria dengan kenikmatanmu yang kenyal.",
  },
  {
    name: "Pisang Goreng",
    meaning: "Kamu selalu bikin suasana jadi lebih hangat dan nyaman.",
  },
  {
    name: "Telur Dadar",
    meaning: "Kamu sederhana tapi selalu bikin orang puas dengan kelezatanmu.",
  },
  {
    name: "Es Buah",
    meaning: "Kamu segar dan penuh warna, selalu bikin hari jadi lebih ceria.",
  },
  {
    name: "Mie Goreng",
    meaning: "Kamu selalu bikin kenyang dan puas dengan rasamu yang lezat.",
  },
  {
    name: "Puding Coklat",
    meaning: "Kamu manis dan selalu bikin suasana jadi lebih nyaman.",
  },
  {
    name: "Gulai Kambing",
    meaning:
      "Kamu kaya rasa dan selalu bikin orang ketagihan dengan kelezatanmu.",
  },
  {
    name: "Kue Nastar",
    meaning:
      "Kamu selalu hadir di saat-saat spesial dengan rasa yang manis dan enak.",
  },
  {
    name: "Krupuk Ikan",
    meaning: "Kamu renyah dan selalu bikin suasana jadi lebih seru.",
  },
  {
    name: "Es Teler",
    meaning: "Kamu segar dan penuh kejutan dengan campuran rasa yang enak.",
  },
  {
    name: "Rujak Buah",
    meaning:
      "Kamu segar dan selalu bikin suasana jadi lebih hidup dengan rasamu yang pedas dan manis.",
  },
  {
    name: "Soto Ayam",
    meaning: "Kamu selalu bikin hangat dan puas dengan kuahmu yang lezat.",
  },
  {
    name: "Tahu Bulat",
    meaning: "Kamu selalu hadir di momen-momen yang pas dengan rasa yang enak.",
  },
  {
    name: "Keripik Singkong",
    meaning: "Kamu renyah dan selalu bikin suasana jadi lebih seru.",
  },
  {
    name: "Kacang Goreng",
    meaning: "Kamu selalu jadi camilan favorit di setiap kesempatan.",
  },
  {
    name: "Tongseng Sapi",
    meaning:
      "Kamu kaya rasa dan selalu bikin orang ketagihan dengan kelezatanmu.",
  },
  {
    name: "Sate Padang",
    meaning:
      "Kamu selalu bikin kenyang dan puas dengan rasa khasmu yang lezat.",
  },
  {
    name: "Nasi Uduk",
    meaning:
      "Kamu selalu bikin kenyang dan puas dengan rasa gurihmu yang enak.",
  },
  {
    name: "Cendol Dawet",
    meaning:
      "Kamu segar dan selalu bikin suasana jadi lebih adem di saat-saat panas.",
  },
  {
    name: "Onde-onde",
    meaning:
      "Kamu selalu hadir di saat-saat spesial dengan rasa yang manis dan enak.",
  },
  {
    name: "Kolak Pisang",
    meaning:
      "Kamu manis dan selalu bikin suasana jadi lebih hangat dan nyaman.",
  },
  {
    name: "Macan Kumbang",
    meaning:
      "Kamu misterius dan kuat, seperti macan yang jarang terlihat tapi selalu waspada.",
  },
  {
    name: "Kuda Emas",
    meaning: "Kamu berharga dan kuat, siap untuk berlari menuju kesuksesan.",
  },
  {
    name: "Elang Biru",
    meaning:
      "Kamu memiliki visi yang tajam dan dapat melihat peluang dari jauh.",
  },
  { name: "Indomie Goreng", meaning: "Selalu bikin kenyang dan bahagia" },
  {
    name: "Es Krim Meleleh",
    meaning: "Selalu mencairkan suasana dengan rasa manisnya",
  },
  {
    name: "Bakso Ulet",
    meaning: "Selalu gigih dan bulat dalam menghadapi masalah",
  },
  { name: "Lem Super", meaning: "Selalu lengket dalam situasi yang rumit" },
  {
    name: "Kecap Manis",
    meaning: "Selalu memberikan sentuhan manis dalam hidup",
  },
  { name: "Sabun Mandi", meaning: "Selalu bersih dan wangi" },
  {
    name: "Kopi Tumpah",
    meaning: "Selalu bersemangat, tapi kadang berantakan",
  },
  { name: "Sepeda Ontel", meaning: "Selalu klasik dan sederhana" },
  { name: "Roti Bakar", meaning: "Selalu hangat dan enak" },
  { name: "Kucing Kampung", meaning: "Selalu mandiri dan penuh petualangan" },
  {
    name: "Jamu Pahit",
    meaning: "Selalu memberi kekuatan meski tak enak di awal",
  },
  { name: "Teh Celup", meaning: "Selalu memberikan rasa hangat di hati" },
  { name: "Tas Kresek", meaning: "Selalu ringan dan praktis" },
  { name: "Es Kelapa", meaning: "Selalu segar dan menyegarkan" },
  { name: "Motor Astrea", meaning: "Selalu setia dan bandel" },
  { name: "Mie Instan", meaning: "Selalu cepat dan mengenyangkan" },
  { name: "Bolu Kukus", meaning: "Selalu lembut dan manis" },
  { name: "Tahu Bulat", meaning: "Selalu enak di segala suasana" },
  { name: "Nasi Uduk", meaning: "Selalu cocok di segala waktu" },
  { name: "Susu Kental Manis", meaning: "Selalu menambah kenikmatan" },
  { name: "Kopi Hitam", meaning: "Selalu memberi semangat di pagi hari" },
  { name: "Kacang Goreng", meaning: "Selalu asyik untuk ngemil" },
  { name: "Ayam Goreng Tepung", meaning: "Selalu renyah dan nikmat" },
  { name: "Sambal Terasi", meaning: "Selalu pedas dan menggigit" },
  { name: "Ketoprak", meaning: "Selalu mengenyangkan dan lezat" },
  { name: "Cendol Dawet", meaning: "Selalu segar di siang hari" },
  { name: "Gado-Gado", meaning: "Selalu penuh warna dan rasa" },
  { name: "Pisang Goreng", meaning: "Selalu manis dan gurih" },
  { name: "Martabak Manis", meaning: "Selalu lezat dan memanjakan lidah" },
  { name: "Bubur Ayam", meaning: "Selalu hangat dan mengenyangkan" },
  { name: "Soto Ayam", meaning: "Selalu kaya rasa dan gurih" },
  { name: "Nasi Padang", meaning: "Selalu penuh dengan kenikmatan" },
  { name: "Rendang Daging", meaning: "Selalu empuk dan kaya rempah" },
  { name: "Nasi Goreng", meaning: "Selalu praktis dan enak" },
  { name: "Bakmi Jawa", meaning: "Selalu menggugah selera" },
  { name: "Sate Ayam", meaning: "Selalu enak di segala acara" },
  { name: "Gulai Kambing", meaning: "Selalu kaya rasa dan lezat" },
  { name: "Rawon Sapi", meaning: "Selalu hitam dan nikmat" },
  { name: "Ikan Bakar", meaning: "Selalu gurih dan enak" },
  { name: "Pepes Tahu", meaning: "Selalu lezat dan bergizi" },
  { name: "Tempe Mendoan", meaning: "Selalu gurih dan renyah" },
  { name: "Keripik Singkong", meaning: "Selalu renyah dan menggoda" },
  { name: "Jus Alpukat", meaning: "Selalu segar dan menyehatkan" },
  { name: "Es Teler", meaning: "Selalu segar dan nikmat" },
  { name: "Bubur Kacang Hijau", meaning: "Selalu hangat dan mengenyangkan" },
  { name: "Bakpao", meaning: "Selalu lembut dan enak" },
  { name: "Pempek", meaning: "Selalu gurih dan kenyal" },
  { name: "Sosis Bakar", meaning: "Selalu enak di segala suasana" },
  { name: "Lumpia Semarang", meaning: "Selalu gurih dan nikmat" },
  { name: "Otak-Otak", meaning: "Selalu enak dan gurih" },
  { name: "Pastel", meaning: "Selalu renyah dan nikmat" },
  { name: "Cilok", meaning: "Selalu kenyal dan enak" },
  { name: "Bakwan Jagung", meaning: "Selalu gurih dan lezat" },
  { name: "Risol", meaning: "Selalu renyah dan enak" },
  { name: "Combro", meaning: "Selalu gurih dan pedas" },
  { name: "Getuk", meaning: "Selalu manis dan kenyal" },
  { name: "Tape Singkong", meaning: "Selalu manis dan segar" },
  { name: "Wedang Jahe", meaning: "Selalu hangat dan menenangkan" },
  { name: "Dawet Ayu", meaning: "Selalu segar dan menggoda" },
  { name: "Es Buah", meaning: "Selalu segar dan penuh warna" },
  { name: "Es Doger", meaning: "Selalu manis dan menyegarkan" },
  { name: "Tengkleng", meaning: "Selalu gurih dan enak" },
  { name: "Gulai Nangka", meaning: "Selalu kaya rasa dan lezat" },
  { name: "Coto Makassar", meaning: "Selalu gurih dan nikmat" },
  { name: "Nasi Liwet", meaning: "Selalu enak dan mengenyangkan" },
  { name: "Bubur Sumsum", meaning: "Selalu lembut dan manis" },
  { name: "Kue Cubit", meaning: "Selalu manis dan lembut" },
  { name: "Bolu Pandan", meaning: "Selalu harum dan enak" },
  { name: "Onde-Onde", meaning: "Selalu kenyal dan manis" },
  { name: "Serabi Solo", meaning: "Selalu lembut dan gurih" },
  { name: "Lemper Ayam", meaning: "Selalu gurih dan lezat" },
  { name: "Kue Lumpur", meaning: "Selalu lembut dan manis" },
  { name: "Kue Lapis", meaning: "Selalu warna-warni dan manis" },
  { name: "Kue Putu", meaning: "Selalu hangat dan manis" },
  { name: "Es Pisang Ijo", meaning: "Selalu segar dan manis" },
  { name: "Klepon", meaning: "Selalu manis dan kenyal" },
  { name: "Martabak Telur", meaning: "Selalu gurih dan enak" },
  { name: "Ayam Penyet", meaning: "Selalu pedas dan menggigit" },
  { name: "Ikan Asin", meaning: "Selalu gurih dan asin" },
  { name: "Sop Buntut", meaning: "Selalu kaya rasa dan nikmat" },
  { name: "Bakso Malang", meaning: "Selalu gurih dan lezat" },
  { name: "Pempek Palembang", meaning: "Selalu enak dan gurih" },
  { name: "Tahu Gejrot", meaning: "Selalu pedas dan segar" },
  { name: "Gepuk Daging", meaning: "Selalu empuk dan lezat" },
  { name: "Ayam Betutu", meaning: "Selalu kaya bumbu dan enak" },
  { name: "Ikan Gurame", meaning: "Selalu gurih dan nikmat" },
  { name: "Udang Goreng", meaning: "Selalu renyah dan enak" },
  { name: "Cumi Saus Tiram", meaning: "Selalu gurih dan lezat" },
  {
    name: "Royco Ayam",
    meaning: "Selalu menambah rasa gurih pada setiap kesempatan",
  },
  { name: "Honda Supra", meaning: "Selalu bisa diandalkan di jalanan" },
  {
    name: "Kompor Meledak",
    meaning: "Selalu memberikan kehangatan yang luar biasa",
  },
  {
    name: "Es Batu Menangis",
    meaning: "Selalu mencair di saat yang tak terduga",
  },
  { name: "Teh Botol Sosro", meaning: "Selalu segar di segala suasana" },
  { name: "Payung Bocor", meaning: "Selalu memberikan kejutan saat hujan" },
  {
    name: "Kursi Tertawa",
    meaning: "Selalu membuatmu nyaman dengan gayanya yang lucu",
  },
  { name: "Motor Vespa", meaning: "Selalu klasik dan penuh gaya" },
  { name: "Ember Bocor", meaning: "Selalu berfungsi walau tak sempurna" },
  {
    name: "Bantal Gebuk",
    meaning: "Selalu menemani tidurmu dengan kenyamanan",
  },
  { name: "Mie Sedap", meaning: "Selalu cepat dan mengenyangkan" },
  { name: "Komputer Ngadat", meaning: "Selalu menantang kesabaranmu" },
  { name: "Handphone Jadul", meaning: "Selalu setia meski ketinggalan zaman" },
  { name: "Kulkas Berisik", meaning: "Selalu bising tapi berguna" },
  { name: "Rokok Gudang Garam", meaning: "Selalu nikmat di setiap tarikan" },
  { name: "Radio Tua", meaning: "Selalu menghidupkan suasana" },
  { name: "Sepatu Butut", meaning: "Selalu nyaman meski usang" },
  { name: "Blender Bising", meaning: "Selalu ribut tapi membantu" },
  { name: "Sapu Ijuk", meaning: "Selalu membersihkan dengan efektif" },
  { name: "Kipas Angin", meaning: "Selalu memberikan angin segar" },
  { name: "Rice Cooker", meaning: "Selalu memasak nasi dengan sempurna" },
  { name: "Senter Mati", meaning: "Selalu ada saat dibutuhkan" },
  { name: "Pisau Tumpul", meaning: "Selalu menantang dalam memotong" },
  { name: "Honda Beat", meaning: "Selalu lincah di jalanan" },
  { name: "Kerupuk Udang", meaning: "Selalu renyah dan nikmat" },
  { name: "Gitar Sumbang", meaning: "Selalu memberikan nada yang tak terduga" },
  { name: "Meja Bergoyang", meaning: "Selalu bergoyang saat digunakan" },
  { name: "Jok Motor", meaning: "Selalu empuk dan nyaman" },
  { name: "Tikar Lipat", meaning: "Selalu praktis di segala acara" },
  { name: "Paku Karet", meaning: "Selalu lentur dan tak terduga" },
  { name: "Lemari Besi", meaning: "Selalu kuat dan kokoh" },
  { name: "Sepeda BMX", meaning: "Selalu siap untuk petualangan" },
  { name: "Tas Belanja", meaning: "Selalu praktis dan berguna" },
  { name: "Lilin Meleleh", meaning: "Selalu memberikan cahaya di kegelapan" },
  { name: "Kabel Kusut", meaning: "Selalu membuat bingung" },
  { name: "Honda CBR", meaning: "Selalu cepat dan penuh gaya" },
  { name: "Sendok Miring", meaning: "Selalu memberi sensasi berbeda" },
  { name: "Gelas Retak", meaning: "Selalu siap walau tak sempurna" },
  { name: "Lampu Tidur", meaning: "Selalu memberikan cahaya lembut" },
  { name: "Karet Gelang", meaning: "Selalu fleksibel dan berguna" },
  { name: "Honda Vario", meaning: "Selalu tangguh di segala medan" },
  { name: "Botol Kaca", meaning: "Selalu jernih dan berguna" },
  { name: "Rantang Susun", meaning: "Selalu membawa bekal dengan rapi" },
  { name: "Kunci Inggris", meaning: "Selalu siap untuk perbaikan" },
  { name: "Honda Tiger", meaning: "Selalu gagah dan kuat" },
  { name: "Toples Kue", meaning: "Selalu penuh kejutan manis" },
  { name: "Wajan Teflon", meaning: "Selalu anti lengket" },
  { name: "Honda Scoopy", meaning: "Selalu trendy dan stylish" },
  { name: "Kasur Busa", meaning: "Selalu empuk dan nyaman" },
  { name: "Sapu Lidi", meaning: "Selalu membersihkan dengan efektif" },
  { name: "Panci Presto", meaning: "Selalu cepat dan praktis" },
  { name: "Honda PCX", meaning: "Selalu mewah dan nyaman" },
  { name: "Talenan Kayu", meaning: "Selalu setia menemani dapur" },
  { name: "Gergaji Tumpul", meaning: "Selalu menantang dalam memotong" },
  { name: "Honda Blade", meaning: "Selalu tajam di jalanan" },
  { name: "Bantal Kapuk", meaning: "Selalu empuk dan lembut" },
  { name: "Penghapus Karet", meaning: "Selalu siap menghapus kesalahan" },
  { name: "Honda Revo", meaning: "Selalu tangguh dan hemat" },
  { name: "Laci Meja", meaning: "Selalu menyimpan rahasia" },
  { name: "Stoples Kaca", meaning: "Selalu jernih dan berisi" },
  { name: "Honda Verza", meaning: "Selalu kuat dan tahan lama" },
  { name: "Cermin Retak", meaning: "Selalu memberikan pantulan unik" },
  { name: "Pena Bocor", meaning: "Selalu meninggalkan jejak" },
  { name: "Honda CB150R", meaning: "Selalu cepat dan bertenaga" },
  { name: "Baskom Plastik", meaning: "Selalu ringan dan praktis" },
  { name: "Paku Beton", meaning: "Selalu kuat dan kokoh" },
  { name: "Honda MegaPro", meaning: "Selalu gagah di jalanan" },
  { name: "Gembok Rusak", meaning: "Selalu menantang keamanan" },
  { name: "Sandal Jepit", meaning: "Selalu santai dan nyaman" },
  { name: "Honda Win", meaning: "Selalu menang di segala medan" },
  { name: "Lemari Plastik", meaning: "Selalu ringan dan praktis" },
  { name: "Kulkas Mini", meaning: "Selalu dingin dan efisien" },
  { name: "Honda CRF", meaning: "Selalu tangguh di segala medan" },
  { name: "Cangkir Teh", meaning: "Selalu menghangatkan suasana" },
  { name: "Kompor Gas", meaning: "Selalu cepat dan panas" },
  { name: "Honda Monkey", meaning: "Selalu lucu dan unik" },
  { name: "Cerek Air", meaning: "Selalu siap menyajikan kehangatan" },
  { name: "Selimut Tebal", meaning: "Selalu hangat dan nyaman" },
  { name: "Honda Beat Street", meaning: "Selalu lincah dan tangguh" },
  { name: "Meja Rias", meaning: "Selalu menampilkan yang terbaik" },
  { name: "Gelas Plastik", meaning: "Selalu ringan dan praktis" },
  { name: "Honda X-ADV", meaning: "Selalu siap untuk petualangan" },
  { name: "Rak Buku", meaning: "Selalu penuh pengetahuan" },
  { name: "Sisir Patah", meaning: "Selalu berfungsi meski tak sempurna" },
  { name: "Honda Rebel", meaning: "Selalu berjiwa pemberontak" },
  { name: "Bantal Guling", meaning: "Selalu nyaman di pelukan" },
  { name: "Honda CRF250", meaning: "Selalu siap menghadapi tantangan" },
  { name: "Lemari Es", meaning: "Selalu menyimpan kesegaran" },
  { name: "Honda Forza", meaning: "Selalu kuat dan bertenaga" },
  { name: "Piring Retak", meaning: "Selalu menantang dengan keunikannya" },
  {
    name: "Harimau Loreng",
    meaning:
      "Kamu tangguh dan memiliki kekuatan untuk melindungi dan menyerang.",
  },
  {
    name: "Gajah Putih",
    meaning:
      "Kamu bijaksana dan memiliki kekuatan besar, lambang dari keberanian dan keteguhan hati.",
  },
  {
    name: "Banteng Sakti",
    meaning: "Kamu kuat dan penuh semangat, tidak takut menghadapi rintangan.",
  },
  {
    name: "Ular Raksasa",
    meaning:
      "Kamu memiliki kebijaksanaan dan kekuatan tersembunyi, siap menyerang jika diperlukan.",
  },
  {
    name: "Ikan Dewa",
    meaning:
      "Kamu tenang dan penuh kedamaian, membawa rezeki dan keberuntungan.",
  },
  {
    name: "Kucing Hitam",
    meaning:
      "Kamu misterius dan penuh dengan rahasia, membawa keberuntungan bagi yang memahami.",
  },
  {
    name: "Rusa Emas",
    meaning:
      "Kamu anggun dan berharga, selalu dihargai oleh orang-orang di sekitarmu.",
  },
  {
    name: "Singa Bermahkota",
    meaning:
      "Kamu lahir sebagai pemimpin, memiliki kekuatan dan kebijaksanaan seorang raja.",
  },
  {
    name: "Kijang Perak",
    meaning:
      "Kamu cepat dan cekatan, selalu waspada dan siap untuk melompat lebih jauh.",
  },
  {
    name: "Kipas Angin Kelereng",
    meaning: "Selalu memberikan angin segar dengan kocaknya",
  },
  {
    name: "Penghapus Ajaib",
    meaning: "Mampu menghapus kesalahan dengan cara yang lucu",
  },
  {
    name: "Kertas Guling Goyang",
    meaning: "Tak pernah diam dan selalu menghibur",
  },
  {
    name: "Pulpen Melambai",
    meaning: "Selalu memberi tanda dengan cara yang unik",
  },
  {
    name: "Tali Tambang Tertawa",
    meaning: "Membuat pekerjaan menjadi lebih menyenangkan",
  },
  {
    name: "Botol Minyak Mengejek",
    meaning: "Seringkali memberi komentar lucu",
  },
  {
    name: "Topi Terbang",
    meaning: "Membuat kepala menjadi lebih ringan dengan keunikannya",
  },
  {
    name: "Payung Terbalik",
    meaning: "Selalu membalikkan situasi dengan cara yang tak terduga",
  },
  { name: "Piring Berjalan", meaning: "Tak pernah tinggal diam di tempatnya" },
  {
    name: "Ember Tertawa",
    meaning: "Menghadirkan keceriaan di setiap kegiatan",
  },
  {
    name: "Lampu Tidur Tertidur",
    meaning: "Terlihat malas-malasan tapi selalu memberikan cahaya yang hangat",
  },
  {
    name: "Gelas Bergoyang",
    meaning: "Selalu memberikan sensasi yang berbeda dalam menikmati minuman",
  },
  {
    name: "Kunci Kamar Mandi Keriting",
    meaning: "Selalu membuat masalah kecil menjadi lucu",
  },
  {
    name: "Pisau Potong Hati",
    meaning: "Mampu memotong rasa sakit dengan kelebihannya",
  },
  {
    name: "Tisu Terbang",
    meaning: "Selalu siap membantu dengan cepat dan lincah",
  },
  {
    name: "Kardus Kocak",
    meaning: "Tak pernah membosankan, selalu menyimpan kejutan di dalamnya",
  },
  {
    name: "Kain Lap Terbang",
    meaning: "Berguna untuk membersihkan dengan cara yang seru",
  },
  {
    name: "Sendok Garpu Goyang",
    meaning: "Menjadi pasangan yang serasi dalam setiap makanan",
  },
  {
    name: "Tempat Pensil Teriak",
    meaning: "Tak pernah diam dan selalu meminta perhatian",
  },
  { name: "Buku Lucu", meaning: "Mampu membuatmu tertawa di setiap halaman" },
  { name: "Cermin Menggigil", meaning: "Selalu memberikan pantulan yang lucu" },
  {
    name: "Kamera Gelantungan",
    meaning: "Selalu mengabadikan momen-momen lucu",
  },
  {
    name: "Cangkir Cemberut",
    meaning:
      "Meski terlihat cemberut, tapi selalu menyajikan minuman dengan baik",
  },
  {
    name: "Kursi Muter",
    meaning: "Memberikan sensasi berputar di setiap duduknya",
  },
  {
    name: "Lemari Tertidur",
    meaning: "Selalu memberikan kenyamanan yang tak terduga",
  },
  {
    name: "Tas Terbang",
    meaning: "Selalu membawa barang-barang dengan gaya yang unik",
  },
  {
    name: "Sepatu Terbang",
    meaning: "Membuat langkahmu lebih ringan dengan kelebihannya",
  },
  {
    name: "Kunci Jalan Bergosip",
    meaning: "Tak pernah diam tentang hal-hal di sekitarnya",
  },
  {
    name: "Sisir Sibuk",
    meaning: "Selalu memberikan gaya yang berbeda pada setiap rambut",
  },
  {
    name: "Gelas Tertawa",
    meaning: "Bergoyang-goyang saat diisi dengan minuman",
  },
  {
    name: "Pisau Potong Goyang",
    meaning: "Selalu memberikan irama yang unik saat digunakan",
  },
  { name: "Meja Ngobrol", meaning: "Tak pernah sepi dari percakapan" },
  { name: "Piring Berguling", meaning: "Suka berputar-putar saat disentuh" },
  {
    name: "Kompor Berpikir",
    meaning: "Selalu memberikan solusi yang cerdas untuk setiap masalah",
  },
  { name: "Kulkas Goyang", meaning: "Bergetar saat diisi dengan makanan" },
  { name: "Cangkir Berlari", meaning: "Tak pernah bisa diam di tempatnya" },
  {
    name: "Lampu Malam Malas",
    meaning: "Terlihat malas tapi selalu memberikan cahaya yang lembut",
  },
  {
    name: "Botol Kecap Keriting",
    meaning: "Selalu memberikan sentuhan yang berbeda pada masakan",
  },
  {
    name: "Sendok Garpu Bergoyang",
    meaning: "Selalu menari-nari saat digunakan",
  },
  { name: "Topi Tertawa", meaning: "Terlihat ceria di atas kepala siapa pun" },
  {
    name: "Korek Api Malas",
    meaning: "Terlihat malas tapi selalu memberikan api yang menyala",
  },
  { name: "Panci Pintar", meaning: "Selalu memberikan masakan yang sempurna" },
  { name: "Kertas Berlari", meaning: "Tak pernah bisa diam di meja" },
  { name: "Pensil Penghilang", meaning: "Selalu menghilang saat dibutuhkan" },
  {
    name: "Penghapus Pelawak",
    meaning: "Selalu membuat kesalahan menjadi lucu",
  },
  {
    name: "Buku Bergoyang",
    meaning: "Selalu memberikan sensasi yang berbeda saat dibaca",
  },
  {
    name: "Ponsel Pintar",
    meaning: "Selalu memberikan jawaban yang tepat untuk setiap pertanyaan",
  },
  { name: "Gunting Goyang", meaning: "Selalu menari-nari saat digunakan" },
  {
    name: "Rak Buku Pintar",
    meaning: "Selalu memberikan buku yang sesuai dengan minatmu",
  },
  {
    name: "Kipas Angin Tertawa",
    meaning: "Terlihat bahagia saat berputar-putar",
  },
  {
    name: "Sabun Mandi Malas",
    meaning:
      "Terlihat malas tapi selalu memberikan kebersihan yang menyegarkan",
  },
  { name: "Pulpen Pintar", meaning: "Selalu memberikan ide yang brilian" },
  {
    name: "Gelas Pintar",
    meaning: "Selalu memberikan minuman yang sesuai dengan keinginanmu",
  },
  {
    name: "Botol Air Mengejek",
    meaning: "Selalu memberikan komentar yang lucu saat diminum",
  },
  {
    name: "Bantal Bergoyang",
    meaning: "Tak pernah bisa diam saat di atas kasur",
  },
  {
    name: "Kursi Bergoyang",
    meaning: "Selalu memberikan sensasi yang menyenangkan saat digunakan",
  },
  {
    name: "Rak Buku Bergoyang",
    meaning:
      "Selalu memberikan sensasi yang unik saat buku diletakkan di atasnya",
  },
  {
    name: "Tas Pintar",
    meaning: "Selalu memberikan barang yang diperlukan saat dibutuhkan",
  },
  { name: "Piring Berlari", meaning: "Tak pernah bisa diam di tempatnya" },
  { name: "Panci Penyihir", meaning: "Mampu membuat masakan yang ajaib" },
  {
    name: "Sendok Garpu Terbalik",
    meaning: "Tak pernah bisa diletakkan dengan benar",
  },
  {
    name: "Kotak Pensil Berguling",
    meaning: "Selalu menggelinding saat diletakkan di meja",
  },
  {
    name: "Kunci Kamar Mandi Tertawa",
    meaning: "Tak pernah bisa diam dan selalu tertawa-tawa",
  },
  {
    name: "Kardus Malas",
    meaning:
      "Selalu terlihat malas tapi selalu memberikan perlindungan yang baik",
  },
  {
    name: "Lampu Tertidur",
    meaning: "Terlihat ngantuk tapi selalu memberikan cahaya yang hangat",
  },
  {
    name: "Anjing Pelacak",
    meaning:
      "Kamu setia dan penuh dedikasi, selalu menemukan jalan menuju tujuanmu.",
  },
];

const App = () => {
  // State variables
  const [khodam, setKhodam] = useState<{
    name: string;
    meaning: string;
  } | null>(null); // Holds current khodam
  const [loading, setLoading] = useState(false); // Loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // Form submission state
  const [submittedName, setSubmittedName] = useState(""); // Submitted name

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 dark:bg-gray-900">
      <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Cek Khodam
        </h1>

        {/* Formik form component */}
        <Formik
          initialValues={{ name: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true); // Start loading state
            setTimeout(() => {
              // Simulate fetching khodam data
              const randomIndex = Math.floor(Math.random() * khodamList.length);
              setKhodam(khodamList[randomIndex]); // Set random khodam
              setLoading(false); // End loading state
              setSubmitting(false); // End Formik's submitting state
              setIsSubmitted(true); // Set form submission state
              setSubmittedName(values.name); // Set submitted name
            }, 2000); // Simulate 2 seconds delay
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="flex flex-col gap-4">
              {/* Input field for name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Nama Anda:
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Masukkan Nama"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  disabled={isSubmitting || isSubmitted} // Disable input during submission
                />
                {/* Display validation error message */}
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-xs italic text-red-500"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                disabled={isSubmitting || isSubmitted} // Disable button during submission
              >
                {isSubmitting ? "Memproses..." : "Cek"}
              </button>

              {/* Display result if submitted and khodam is found */}
              {isSubmitted && khodam && (
                <div
                  className="mt-6 border-l-4 border-green-500 bg-green-100 p-4 text-green-700"
                  role="alert"
                >
                  <p className="font-bold">Hasil:</p>
                  <p>Halo {submittedName}, Khodamu adalah: </p>
                  <span className="text-xl font-bold text-blue-500">
                    {khodam.name}
                  </span>
                  <p>
                    <span className="text-gray-900">{khodam.meaning}</span>
                  </p>
                </div>
              )}

              {/* Display reset button during loading or after submission */}
              {(isSubmitted || loading) && (
                <button
                  type="button"
                  className="focus:shadow-outline mt-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400 focus:outline-none"
                  onClick={() => {
                    resetForm(); // Reset Formik form
                    setIsSubmitted(false); // Reset submission state
                    setKhodam(null); // Clear khodam data
                    setSubmittedName(""); // Clear submitted name
                  }}
                >
                  {loading ? "Loading..." : "Cek Lagi"}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;
