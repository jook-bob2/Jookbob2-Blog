package com.management.util;

import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.NoArgsConstructor;

//@NoArgsConstructor
@Service
public class S3Service {
	private AmazonS3 s3Client;
	
	@Value("${cloud.aws.credentials.access-key}")
	private String accessKey;
	
	@Value("${cloud.aws.credentials.secret-key}")
	private String secretKey;
	
	private final String bucket = "mybucket7009";
	
	@Value("${cloud.aws.region.static}")
	private String region;
	
	@PostConstruct
	public void setS3Client() {
		AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
		
		s3Client = AmazonS3ClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(credentials))
				.withRegion(this.region)
				.build();
	}
	
	public String upload(MultipartFile file, String dirName, byte[] fileData) throws Exception {
		String originalName = file.getOriginalFilename();
		
		// UUID 발급
		UUID uid = UUID.randomUUID();
		String savedName = uid.toString() + "_" + originalName;
		// 업로드할 디렉토리 생성
		String savedPath = calcPath(dirName);
		File target = new File(dirName + 
				savedPath, savedName);
		
		// 백슬래시 -> 슬래시로 치환
		String fileNm = target.toString().replace("\\","/");

		s3Client.putObject(new PutObjectRequest(bucket, fileNm, file.getInputStream(), null)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		return s3Client.getUrl(bucket, fileNm).toString();
	}
	
	public void deleteFile(String prevFile) throws Exception {
		String imgKey[] = prevFile.split("/");
		String fileNm = "";
		int j = 0;
		for (int i = 0; i<imgKey.length; i++) {
			if (imgKey[i].equals("upload")) {
				j += i;
				fileNm = imgKey[i];
				continue;
			} else if (j > 0) {
				fileNm += "/" + imgKey[i];
			}
		}
		if (fileNm != null && !fileNm.equals("")) s3Client.deleteObject(new DeleteObjectRequest(bucket, fileNm));
	}
	
	private static String calcPath(String uploadPath) {
		Calendar cal = Calendar.getInstance();
		
		String yearPath = File.separator + 
				cal.get(Calendar.YEAR);
		String monthPath = yearPath + File.separator + 
				new DecimalFormat("00").format(cal.get(Calendar.MONTH)+1);
		String datePath = monthPath + File.separator + 
				new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		return datePath;
	}
}
