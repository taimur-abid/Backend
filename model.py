import face_recognition
import cv2

def face_recognition_func(path_img_1:str, path_img_2:str):
      result: str = ""
      face1 = face_recognition.load_image_file(path_img_1)
      face1 = cv2.cvtColor(face1,cv2.COLOR_BGR2RGB)
      result1 = face_recognition.face_locations(face1)[0]
      encoderesult1 = face_recognition.face_encodings(face1)[0]

      rectangle_face_1 = cv2.rectangle(face1, (result1[3], result1[0]), (result1[1], result1[2]), (255,0,0), 2)

      face2 = face_recognition.load_image_file(path_img_2)
      face2 = cv2.cvtColor(face2,cv2.COLOR_BGR2RGB)
      result2 = face_recognition.face_locations(face2)[0]
      encoderesult2 = face_recognition.face_encodings(face2)[0]

      rectangle_face_2 = cv2.rectangle(face2, (result2[3], result2[0]), (result2[1], result2[2]), (255,0,0), 2)

      compare_var = face_recognition.compare_faces([encoderesult1], encoderesult2)
      final_var = face_recognition.face_distance([encoderesult1], encoderesult2)

      if (final_var > 0.45):
            result = "False"
            print("[False]", final_var)
      else:
            result = "True"
            print("[True]", final_var)

      cv2.imshow('face1', rectangle_face_1)
      cv2.imshow('face2', rectangle_face_2)
      cv2.waitKey(0)
      return result





