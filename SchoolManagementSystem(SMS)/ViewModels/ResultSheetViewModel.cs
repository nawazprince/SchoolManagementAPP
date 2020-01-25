
using SchoolManagementSystem_SMS_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.ViewModels
{
    public class ResultSheetViewModel
    {

        public ResultSheetViewModel()
        {

        }

        public int YearId { get; set; }
        public int TermId { get; set; }

        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public int ShiftId { get; set; }
        public int SubjectId { get; set; }
        public int GroupId { get; set; }
       

        public List<ResultEntryListItem> ResultEntryListItems { get; set; }

    }


     public class ResultEntryListItem
    {
        public ResultEntryListItem( StudentDetailsInfo student, Subjects subjects,int examId)
        {
            this.resultId = student.Result?.First(r=>r.ExamId== examId)?.ResultId?? 0;
            this.examId = student.Result?.First(r => r.ExamId == examId)?.ExamId ?? examId;
            this.StudentDetailsId = student.StudentDetailsId;
            this.StudentName = student.Admission?.StudentName;
            this.Class = student.Class?.ClassName;
            this.Section = student.Section?.SectionName;
            this.Shift = student.Shift?.ShiftName;
            this.SubjectId = subjects.SubjectId;
            this.SubMCQ = subjects.MCQMarks;
            this.SubWRITTEN = subjects.WrittenMarks;
            this.SubPRAC = subjects.PracticalMarks;
            this.SubCTMarks = subjects.CTMarks;
            this.MCQ = student.Result?.First(r => r.ExamId == examId)?.MCQMarks ?? 0;
            this.WRITTEN = student.Result?.First(r => r.ExamId == examId)?.WrittenMarks ?? 0;
            this.CTMarks = student.Result?.First(r => r.ExamId == examId)?.CTMarks ?? 0;
            this.PRAC = student.Result?.First(r => r.ExamId == examId)?.Practical ?? 0;
            this.TOTAL = MCQ + WRITTEN + CTMarks + PRAC;
            this.Grade = student.Result?.First(r => r.ExamId == examId)?.Grade;
            this.GradePoint = 0;
            this.Pass = false;
        }
        public int resultId { get; set; }
        public int examId { get; set; }
        public int StudentDetailsId { get; set; }
        public string StudentName { get; set; }
        public string Class { get; set; }
        public string Section { get; set; }
        public string Shift { get; set; }

        public int SubjectId { get; set; }

        public int SubMCQ { get; set; }
        public int SubWRITTEN { get; set; }
        public int SubPRAC { get; set; }
        public int SubCTMarks { get; set; }
        public int SubPassMark { get; set; }


        public int MCQ { get; set; }
        public int WRITTEN { get; set; }
        public int PRAC { get; set; }
        public int CTMarks { get; set; }
        public int TOTAL { get; set; }
        public string Grade { get; set; }
        public float GradePoint { get; set; }
        public bool Pass { get; set; }

    }
}
