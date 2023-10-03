/*
   Copyright 2023 Wasabi Codes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

#include <napi.h>
#include <cstdlib>

#ifdef _WIN32
#include <windows.h>
#endif

using namespace Napi;

Napi::Value ShortName(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
      Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
      return env.Null();
  }

  Napi::Value val = info[0];
  if (!val.IsString()) {
      Napi::TypeError::New(env, "Wrong arguments")
          .ThrowAsJavaScriptException();
      return env.Null();
  }

#ifdef _WIN32
  std::u16string pathObj = val.ToString().Utf16Value();
  const WCHAR* path = (WCHAR*) pathObj.c_str();

  DWORD len = GetShortPathNameW(path, nullptr, 0);
  WCHAR* out = new WCHAR[len];
  len = GetShortPathNameW(path, out, len);

  if (len < 1) {
      Napi::Error::New(env, "Win32 API gave empty string");
      delete[] out;
      return env.Null();
  }

  Napi::String ret = Napi::String::New(env, (const char16_t*)out, len);
  delete[] out;
  return ret;
#else
  Napi::Error::New(env, "Not windows")
      .ThrowAsJavaScriptException();
  return env.Null();
#endif
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "shortName"),
              Napi::Function::New(env, ShortName));
  return exports;
}

NODE_API_MODULE(addon, Init)
