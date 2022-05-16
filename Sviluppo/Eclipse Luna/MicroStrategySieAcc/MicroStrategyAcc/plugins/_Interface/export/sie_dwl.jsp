
<%@ page import="java.io.File"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.io.OutputStream"%>

<%
 String name=request.getParameter("DOC");
String path=request.getParameter("path");
File file = new File(path+name);
response.setContentType("application/xlsx");
response.addHeader("Content-Disposition", "attachment; filename="+name);
response.setContentLength((int) file.length());


try {
    FileInputStream fileInputStream = new FileInputStream(file);
    OutputStream responseOutputStream = response.getOutputStream();
    int bytes;
    while ((bytes = fileInputStream.read()) != -1) {
        responseOutputStream.write(bytes);
    }
    fileInputStream.close();
    responseOutputStream.close();

} catch (FileNotFoundException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
} 


/* Dim nomeFile as String
Dim path As String				
If Not IsNothing(Request("DOC")) and Not IsNothing(Request("path")) Then
   Try
      nomeFile = Request("DOC").toString()			
		path=Request("path").toString()

		Dim fs As FileStream 
		fs = File.Open(path & nomeFile, FileMode.Open)

		Dim bytBytes(fs.Length) As Byte
		Dim strLen As String
		strLen = fs.Length

		fs.Read(bytBytes, 0, fs.Length)
		fs.Close()
		Response.BufferOutput = False
		Response.Clear
		'Passo il file reale
		'caronteResponse.AddHeader("Cache-Control", "No-cache") 
		'Response.AddHeader("Pragma","public")
		Response.AddHeader("Content-disposition", "attachment; filename=" & nomeFile)
		Dim aFile As String()
		aFile = nomeFile.split(".")																		

		'Dimenzione File 
		Response.AddHeader("Content-Length", strLen)
		
		if aFile.length>0 then
			Dim est As String  
			est = aFile(aFile.length()-1).ToLower()
			if est.compareTo("pdf") = 0 then
				'Imposto il mime type
				Response.ContentType = "application/pdf"
			else if est.compareTo("xls") = 0 then
				'Imposto il mime type
				Response.ContentType = "application/excel"
			else if est.compareTo("doc") = 0 then
				'Imposto il mime type
				Response.ContentType = "application/msword"
			else
				'Imposto il mime type
				Response.ContentType = "application/octet-stream"
			end if
		end if
		
		'Response.ContentType = "application/octet-stream"


		'Scrivo in binario l'output
		Response.BinaryWrite(bytBytes)
		Response.Flush
		'VisualizzaFileStreaming(nomeFile)
   Catch ex As Exception
         Response.Flush
   End Try
   
End If */
%>
