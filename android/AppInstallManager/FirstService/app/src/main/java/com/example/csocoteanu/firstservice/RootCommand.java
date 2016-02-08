package com.example.csocoteanu.firstservice;

import android.provider.ContactsContract;

import java.io.*;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.concurrent.CountDownLatch;

public class RootCommand
{
    private String mCommand = null;
    private String[] mArgs = null;
    private String mCmd = null;

    public RootCommand(String command, String[] args)
    {
        mCommand = command;
        mArgs = args;

        mCmd = "pm disable com.google.android.gm";
    }

    public String Execute()
    {
        try
        {
            String CHARSET_NAME = "UTF-8";

            ProcessBuilder pb = new ProcessBuilder().redirectErrorStream(true).directory(new File("/")).command("sudo su");
            Process p = pb.start();

            // We must handle the result stream in another Thread first
            StreamReader stdoutReader = new StreamReader(p.getInputStream(), CHARSET_NAME);
            stdoutReader.start();

            OutputStream out = p.getOutputStream();
            out.write((mCmd + "\n").getBytes(CHARSET_NAME));
            out.write(("exit" + "\n").getBytes(CHARSET_NAME));
            out.flush();

            p.waitFor();
            return stdoutReader.getResult();
        }
        catch (Exception ex)
        {
            return ex.getMessage();
        }
    }
}

class StreamReader extends Thread {
    private InputStream is;
    private StringBuffer mBuffer;
    private String mCharset;
    private CountDownLatch mCountDownLatch;

    StreamReader(InputStream is, String charset) {
        this.is = is;
        mCharset = charset;
        mBuffer = new StringBuffer("");
        mCountDownLatch = new CountDownLatch(1);
    }

    String getResult() {
        try {
            mCountDownLatch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return mBuffer.toString();
    }

    @Override
    public void run() {
        InputStreamReader isr = null;
        try {
            isr = new InputStreamReader(is, mCharset);
            int c = -1;
            while ((c = isr.read()) != -1) {
                mBuffer.append((char) c);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (isr != null)
                    isr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            mCountDownLatch.countDown();
        }
    }
}